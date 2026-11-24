/* global process */
import { chatbotLimiter } from '../../../lib/rateLimit';
import { sanitizeText } from '../../../lib/formValidation';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // 1. Rate limiting
  const rateCheck = await chatbotLimiter.check(req, 'chat');
  if (!rateCheck.success) {
    res.setHeader('Retry-After', '60');
    return res.status(429).json({
      success: false,
      reply: 'You are sending messages too fast. Please wait a minute before sending another message.'
    });
  }

  const { message, name, history } = req.body ?? {};

  // 2. Input validation
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'Missing or invalid required field: message' });
  }

  const sanitizedMessage = sanitizeText(message, 500);
  if (message.length > 500) {
    return res.status(400).json({ error: 'Message exceeds maximum allowed length of 500 characters' });
  }

  const sanitizedName = sanitizeText(name || '', 80);

  // Validate history array if provided
  if (history && (!Array.isArray(history) || history.length > 20)) {
    return res.status(400).json({ error: 'Invalid history parameter (max 20 messages allowed)' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server configuration error: GEMINI_API_KEY is not configured' });
  }

  const fallbackContactReply = "Thank you for reaching out to Bharat Properties. Our AI assistant is currently unavailable, but our team is ready to help at +91-9991333570 or info@bharatproperties.co.";

  try {
    const msgLower = sanitizedMessage.toLowerCase();
    let reply = "Hello! I am the Bharat Properties AI Assistant. How can I help you today?";

    if (sanitizedMessage.includes('User provided contact info')) {
      reply = `Thank you, ${sanitizedName || 'there'}. I have noted your contact details. Are you looking to buy, sell, or rent a property today?`;
    } else if (msgLower.includes('buy') || msgLower.includes('kharidna') || msgLower.includes('lena')) {
      reply = "Great! We have excellent properties available. Are you looking for a plot, apartment, or commercial space? Any specific city like Kurukshetra or Mohali?";
    } else if (msgLower.includes('sell') || msgLower.includes('bechna')) {
      reply = "We'd be happy to help you sell your property at the best price. Could you tell me the location and type of your property?";
    } else if (msgLower.includes('plot')) {
      reply = "We have premium plots available in Kurukshetra (Kohinoor City) and other prime locations. What is your budget range?";
    } else if (msgLower.includes('mohali')) {
      reply = "Mohali is a fantastic location! We have projects near Airport Road and Sector 82. What kind of property are you interested in?";
    } else if (msgLower.includes('kurukshetra') || msgLower.includes('sec 3') || msgLower.includes('sector 3') || msgLower.includes('sec 4')) {
      reply = "In Kurukshetra, Sector 3 and Sector 4 are highly sought after. We also have Kohinoor City in Sector 32. Would you like to schedule a site visit?";
    } else if (msgLower.includes('price') || msgLower.includes('budget') || msgLower.includes('cr')) {
      reply = "Got it. I'll pass this budget requirement to our senior sales team. They will contact you shortly with the best matches.";
    } else if (msgLower.includes('hi') || msgLower.includes('hello') || msgLower.includes('gm')) {
      reply = "Hello! Welcome to Bharat Properties. Are you looking to buy or sell a property?";
    }

    if (!sanitizedMessage.includes('User provided contact info')) {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      const prompt = `You are a professional real estate AI assistant for Bharat Properties in India (Kurukshetra, Mohali, etc.).
The user says: "${sanitizedMessage}". 
Respond naturally, helpfully, and concisely in Hinglish or English. Ask relevant questions to understand their property needs (buy/sell, budget, location like Sector 3, 4, Mohali, Kurukshetra).`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      try {
        const response = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
            reply = data.candidates[0].content.parts[0].text;
          }
        }
      } catch (fetchErr) {
        clearTimeout(timeoutId);
        // Fall back gracefully to preset reply without crashing
        console.warn('[Website Chatbot] Gemini fetch timed out or failed:', fetchErr.message || fetchErr);
      }
    }

    return res.status(200).json({ success: true, reply });
  } catch (err) {
    console.error('[Website Chatbot Error]:', err.message || err);
    return res.status(200).json({ success: true, reply: fallbackContactReply });
  }
}
