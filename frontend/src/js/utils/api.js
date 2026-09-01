export async function fetchWithAuth(url, options = {}) {
  let token = localStorage.getItem('bolog_access_token');
  if (!token) {
    window.location.hash = '#login';
    return null;
  }

  const headers = { ...options.headers, 'Authorization': `Bearer ${token}` };
  let response = await fetch(url, { ...options, headers });

  if (response.status === 401 || response.status === 403) {
    // Intentar refrescar
    const refresh_token = localStorage.getItem('bolog_refresh_token');
    if (!refresh_token) {
      window.location.hash = '#login';
      return null;
    }

    const refreshRes = await fetch('/api/auth/refresh?refresh_token=' + refresh_token, { method: 'POST' });
    if (refreshRes.ok) {
      const data = await refreshRes.json();
      localStorage.setItem('bolog_access_token', data.access_token);
      localStorage.setItem('bolog_refresh_token', data.refresh_token);
      headers['Authorization'] = `Bearer ${data.access_token}`;
      response = await fetch(url, { ...options, headers });
    } else {
      window.location.hash = '#login';
      return null;
    }
  }

  return response;
}
