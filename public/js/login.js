document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
  
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
  
    const data = await res.json();
    const status = document.getElementById('status');
  
    if (res.ok) {
      const lastLogin = getCookie('lastLogin');
      alert(`Login successful! Last login: ${decodeURIComponent(lastLogin)}`);
      window.location.href = '/inbox.html';
    } else {
      status.textContent = data.error || 'Login failed';
    }
  });
  
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts.length === 2 ? parts.pop().split(';').shift() : '';
  }
  