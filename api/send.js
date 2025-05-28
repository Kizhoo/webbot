// file: /api/send.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, message } = req.body;

  if (!username || !message) {
    return res.status(400).json({ success: false, msg: 'Data kosong!' });
  }

  const BOT_TOKEN = process.env.BOT_TOKEN;
  const OWNER_ID = process.env.OWNER_ID;
  const text = `💬 Pesan Baru dari Website\n👤 Nama: ${username}\n📝 Pesan: ${message}`;

  try {
    const telegramRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: OWNER_ID, text }),
    });

    const data = await telegramRes.json();
    if (!data.ok) {
      return res.status(500).json({ success: false, msg: 'Telegram error', detail: data });
    }

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, msg: 'Gagal kirim ke Telegram' });
  }
}
