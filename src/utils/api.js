const API_URL = process.env.VUE_APP_API_URL;

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
};