const API_URL = process.env.VUE_APP_API_URL;

export default {
  getCart() {
    return fetch(`${API_URL}/cart`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }).then(response => {
      if (!response.ok) throw response;
      return response.json();
    });
  },
  addToCart(productId) {
    return fetch(`${API_URL}/cart/${productId}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }).then(response => {
      if (!response.ok) throw response;
      return response.json();
    });
  },
  removeFromCart(cartItemId) {
    return fetch(`${API_URL}/cart/${cartItemId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }).then(response => {
      if (!response.ok) throw response;
      return response.json();
    });
  },
  placeOrder() {
    return fetch(`${API_URL}/order`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }).then(response => {
      if (!response.ok) throw response;
      return response.json();
    });
  },
  getOrders() {
    return fetch(`${API_URL}/order`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }).then(response => {
      if (!response.ok) throw response;
      return response.json();
    });
  },
};