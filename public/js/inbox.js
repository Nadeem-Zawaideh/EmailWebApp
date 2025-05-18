async function fetchInbox() {
    const res = await fetch('/api/inbox');
    const container = document.getElementById('inbox-container');
  
    if (res.ok) {
      const data = await res.json();
      if (data.emails.length === 0) {
        container.innerHTML = '<p>No emails yet.</p>';
        return;
      }
  
      container.innerHTML = '<ul>' + data.emails.map(email => `
        <li>
          <strong>From:</strong> ${email.sender_name} <br>
          <strong>Subject:</strong> ${email.subject} <br>
          <p>${email.body}</p>
          <hr>
        </li>
      `).join('') + '</ul>';
    } else {
      container.innerHTML = `<p>${(await res.json()).error}</p>`;
    }
  }
  
  // Poll every 60 seconds
  fetchInbox();
  setInterval(fetchInbox, 60000);
  
  // Show last login from cookie
  document.getElementById('last-login').textContent = "You last logged in on: " + decodeURIComponent(getCookie('lastLogin'));
  
  // Logout
  document.getElementById('logout-btn').addEventListener('click', async () => {
    await fetch('/api/logout', { method: 'POST' });
    window.location.href = '/index.html';
  });
  
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts.length === 2 ? parts.pop().split(';').shift() : '';
  }
  