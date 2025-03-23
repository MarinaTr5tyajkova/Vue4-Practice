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
  fetchProducts() {
    return fetch(`${API_URL}/products`).then(response => {
      if (!response.ok) throw response;
      return response.json();
    });
  },
  addToCart(productId) {
    return fetch(`${API_URL}/cart/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(response => {
      if (!response.ok) throw response;
      return response.json();
    });
  },
};