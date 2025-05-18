async function fetchSent() {
    const res = await fetch('/api/sent');
    const container = document.getElementById('sent-container');
  
    if (res.ok) {
      const data = await res.json();
      if (data.emails.length === 0) {
        container.innerHTML = '<p>No sent emails yet.</p>';
        return;
      }
  
      container.innerHTML = '<ul>' + data.emails.map(email => `
        <li>
          <strong>To:</strong> ${email.recipient_name} <br>
          <strong>Subject:</strong> ${email.subject} <br>
          <p>${email.body}</p>
          <hr>
        </li>
      `).join('') + '</ul>';
    } else {
      container.innerHTML = `<p>${(await res.json()).error}</p>`;
    }
  }
  
  fetchSent();
  
  document.getElementById('logout-btn').addEventListener('click', async () => {
    await fetch('/api/logout', { method: 'POST' });
    window.location.href = '/index.html';
  });
  