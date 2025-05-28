function sendMessage() {
  const username = document.getElementById('username').value.trim();
  const message = document.getElementById('message').value.trim();
  const status = document.getElementById('status');

  if (!username || !message) {
    status.textContent = "Nama dan pesan wajib diisi!";
    status.style.color = 'orange';
    return;
  }

  fetch('/api/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, message })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      status.textContent = "Pesan berhasil dikirim!";
      status.style.color = 'lightgreen';
      document.getElementById('username').value = '';
      document.getElementById('message').value = '';
    } else {
      status.textContent = "Gagal mengirim pesan.";
      status.style.color = 'red';
    }
  })
  .catch(err => {
    status.textContent = "Error: " + err.message;
    status.style.color = 'red';
  });
}
