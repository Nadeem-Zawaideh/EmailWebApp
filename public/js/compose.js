document.getElementById('compose-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const recipient = document.getElementById('recipient').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const body = document.getElementById('body').value.trim();
  
    const res = await fetch('/api/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipient, subject, body })
    });
  
    const data = await res.json();
    const status = document.getElementById('status');
  
    if (res.ok) {
      status.textContent = 'Email sent successfully!';
      document.getElementById('compose-form').reset();
    } else {
      status.textContent = data.error || 'Failed to send email';
    }
  });
  