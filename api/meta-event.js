const PIXEL_ID = '1489133676591141';
const TOKEN = process.env.META_PIXEL_TOKEN;

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const { event_name, client_user_agent, event_source_url } = req.body || {};

    const payload = {
      data: [{
        event_name: event_name || 'PageView',
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: event_source_url || 'https://nutrichef-landing.vercel.app',
        action_source: 'website',
        client_user_agent: client_user_agent || req.headers['user-agent'] || '',
      }]
    };

    const response = await fetch(
      `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();
    return res.status(200).json({ ok: true, data });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
