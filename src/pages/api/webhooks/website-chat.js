/* global process */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { message, name } = req.body ?? {};

  if (!message) {
    return res.status(400).json({ error: 'Missing required fields: message' });
  }

  try {
    // Basic hardcoded logic fallback if no API key or to save tokens
    const msgLower = message.toLowerCase();
    let reply = "Hello! I am the Bharat Properties AI Assistant. How can I help you today?";

    if (message.includes('User provided contact info')) {
        reply = `Thank you, ${name || 'there'}. I have noted your contact details. Are you looking to buy, sell, or rent a property today?`;
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

    // Attempt to call Gemini API if key is available
    const apiKey = process.env.GEMINI_API_KEY || "AIzaSyAP3lm7rcTm2lSrfflrjBLkKEeVyKSoY9M";
    
    if (apiKey && !message.includes('User provided contact info')) {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      const prompt = `You are a professional real estate AI assistant for Bharat Properties in India (Kurukshetra, Mohali, etc.).
The user says: "${message}". 
Respond naturally, helpfully, and concisely in Hinglish or English. Ask relevant questions to understand their property needs (buy/sell, budget, location like Sector 3, 4, Mohali, Kurukshetra).`;

      const response = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.candidates && data.candidates[0].content.parts[0].text) {
          reply = data.candidates[0].content.parts[0].text;
        }
      }
    }

    return res.status(200).json({ success: true, reply });
  } catch (err) {
    console.error('Website AI webhook error:', err);
    return res.status(502).json({ success: false, reply: 'Network error. Please try again.' });
  }
}
