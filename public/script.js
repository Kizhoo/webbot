document.getElementById("submitBtn").addEventListener("click", async function () {
  const username = document.getElementById("username").value;
  const message = document.getElementById("message").value;

  const response = await fetch("/api/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, message }),
  });

  const result = await response.json();
  if (result.success) {
    alert("Pesan berhasil dikirim!");
  } else {
    alert("Gagal mengirim pesan.");
  }
});
