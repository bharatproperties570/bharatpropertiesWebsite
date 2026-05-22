/* global process */
/* --------------------------------------------------------------
   Enterprise‑grade WhatsApp AI Assistant webhook
   --------------------------------------------------------------
   This endpoint receives the payload from the front‑end (Sent by the
   WhatsApp campaign form) and forwards it to the AI service that powers
   the “Bharat Properties AI Assistant”.  The endpoint is deliberately
   lightweight so it can run on Vercel without any extra server
   infrastructure.

   Expected payload (JSON):
   {
     sessionId: string,
     message:   string,
     name:      string,
     mobile:    string
   }

   Response (JSON):
   { reply: string }   // whatever the AI returns
   -------------------------------------------------------------- */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { sessionId, message, name, mobile } = req.body ?? {};

  if (!message || !mobile) {
    return res
      .status(400)
      .json({ error: 'Missing required fields: message, mobile' });
  }

  // -------------------------------------------------
  // 1️⃣  Resolve the AI service endpoint.
  // -------------------------------------------------
  // The AI endpoint can be overridden via .env.local – this keeps the
  // production URL secret and lets developers test against a local mock.
  const AI_ENDPOINT =
    process.env.WHATSAPP_AI_ENDPOINT ||
    'https://api.bharatproperties.co/api/whatsapp-ai';

  // -------------------------------------------------
  // 2️⃣  Forward the request to the AI service.
  // -------------------------------------------------
  try {
    const aiRes = await fetch(AI_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Forward any auth header the front‑end might have set.
        ...(req.headers.authorization && {
          Authorization: req.headers.authorization,
        })
      },
      body: JSON.stringify({
        sessionId,
        message,
        name,
        mobile,
        source: 'WhatsApp'
      })
    });

    const aiData = await aiRes.json();
    return res.status(aiRes.status).json(aiData);
  } catch (err) {
    console.error('WhatsApp AI webhook error:', err);
    return res
      .status(502)
      .json({ error: 'Unable to reach WhatsApp AI assistant' });
  }
}
