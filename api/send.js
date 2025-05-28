import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { username, message } = req.body;

  if (!username || !message) {
    return res.status(400).json({ success: false, msg: "Data kosong!" });
  }

  const text = `💬 Pesan Baru dari Website\n👤 Nama: ${username}\n📝 Pesan: ${message}`;

  try {
    await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: process.env.OWNER_ID,
        text,
      })
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Gagal kirim ke Telegram" });
  }
}
