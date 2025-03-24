const API_URL = 'http://lifestealer86.ru/public/api-shop';

export default {
  register(userData) {
    return fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    }).then(response => {
      if (!response.ok) throw response;
      return response.json();
    });
  },
  login(credentials) {
    return fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    }).then(response => {
      if (!response.ok) throw response;
      return response.json();
    });
  },
};