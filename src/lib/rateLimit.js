/**
 * @file rateLimit.js
 * Rate limiting abstraction with in-memory store and distributed KV adapter interface.
 * 
 * NOTE ON SERVERLESS ENVIRONMENTS:
 * The default in-memory store tracks rate limits in process memory. On serverless
 * platforms like Vercel, memory is per-container and ephemeral. In-memory limiting
 * is provided as a best-effort defense against bursts within the same container.
 * For strict distributed rate limiting across all serverless invocations, plug in
 * an Upstash Redis or Vercel KV adapter via `createKvRateLimiter()`.
 */

export class InMemoryRateLimitStore {
  constructor() {
    this.hits = new Map();
  }

  async increment(key, windowMs) {
    const now = Date.now();
    const record = this.hits.get(key);

    if (!record || record.resetTime <= now) {
      const newRecord = { count: 1, resetTime: now + windowMs };
      this.hits.set(key, newRecord);
      this._cleanup(now);
      return { count: 1, resetTime: newRecord.resetTime };
    }

    record.count += 1;
    return { count: record.count, resetTime: record.resetTime };
  }

  _cleanup(now) {
    if (this.hits.size > 1000) {
      for (const [k, v] of this.hits.entries()) {
        if (v.resetTime <= now) {
          this.hits.delete(k);
        }
      }
    }
  }
}

/**
 * Adapter interface for distributed key-value stores (e.g. Upstash Redis / Vercel KV).
 * To use:
 *   const store = new DistributedKvRateLimitStore({
 *     incr: (key) => kv.incr(key),
 *     expire: (key, seconds) => kv.expire(key, seconds),
 *     pttl: (key) => kv.pttl(key)
 *   });
 */
export class DistributedKvRateLimitStore {
  constructor(kvClient) {
    if (!kvClient || typeof kvClient.incr !== 'function') {
      throw new Error('DistributedKvRateLimitStore requires a client implementing incr()');
    }
    this.client = kvClient;
  }

  async increment(key, windowMs) {
    const count = await this.client.incr(key);
    if (count === 1 && typeof this.client.expire === 'function') {
      await this.client.expire(key, Math.ceil(windowMs / 1000));
    }
    const ttl = typeof this.client.pttl === 'function' ? await this.client.pttl(key) : windowMs;
    return {
      count,
      resetTime: Date.now() + Math.max(ttl, 0)
    };
  }
}

export class RateLimiter {
  constructor({ maxRequests = 10, windowMs = 60000, store = new InMemoryRateLimitStore() } = {}) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.store = store;
  }

  getClientIp(req) {
    const forwarded = req.headers['x-forwarded-for'];
    if (forwarded) {
      const first = typeof forwarded === 'string' ? forwarded.split(',')[0] : forwarded[0];
      return first.trim();
    }
    return req.headers['x-real-ip'] || req.socket?.remoteAddress || '127.0.0.1';
  }

  async check(req, customKey = '') {
    const ip = this.getClientIp(req);
    const key = customKey ? `rl:${customKey}:${ip}` : `rl:${ip}`;
    const { count, resetTime } = await this.store.increment(key, this.windowMs);

    const remaining = Math.max(0, this.maxRequests - count);
    const success = count <= this.maxRequests;

    return {
      success,
      limit: this.maxRequests,
      remaining,
      resetTime,
      ip
    };
  }
}

// Global default limiters for reuse
export const publicApiLimiter = new RateLimiter({ maxRequests: 20, windowMs: 60000 });
export const leadSubmissionLimiter = new RateLimiter({ maxRequests: 5, windowMs: 60000 });
export const chatbotLimiter = new RateLimiter({ maxRequests: 15, windowMs: 60000 });
