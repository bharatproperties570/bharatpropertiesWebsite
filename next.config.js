import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cspReportOnly = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://maps.googleapis.com https://maps.gstatic.com https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https://api.bharatproperties.co https://www.bharatproperties.co https://bharatproperties.co https://lh3.googleusercontent.com https://drive.google.com https://images.unsplash.com https://maps.googleapis.com https://maps.gstatic.com",
  "media-src 'self' https://cdn.pixabay.com https://api.bharatproperties.co",
  "connect-src 'self' https://api.bharatproperties.co https://generativelanguage.googleapis.com https://maps.googleapis.com https://www.google-analytics.com",
  "frame-src 'self' https://www.google.com https://maps.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'"
].join('; ');

export default {
  outputFileTracingRoot: __dirname,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'api.bharatproperties.co' },
      { protocol: 'https', hostname: 'www.bharatproperties.co' },
      { protocol: 'https', hostname: 'bharatproperties.co' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'drive.google.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512]
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/blog/blog-1',
        destination: '/blog/top-5-investment-locations-in-north-india-for-2026',
        permanent: true,
      },
      {
        source: '/blog/blog-3',
        destination: '/blog/first-time-home-buyer-guide-everything-you-need-to-know',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self)' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Content-Security-Policy-Report-Only', value: cspReportOnly },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/assets/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};
