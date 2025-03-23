import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/utils/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
    products: [],
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
  },
  actions: {
    async register({ commit }, userData) {
      const response = await api.register(userData);
      commit('SET_TOKEN', response.data.user_token);
      localStorage.setItem('token', response.data.user_token);
    },
    async fetchProducts() {
      const response = await api.fetchProducts();
      return response;
    },
    async addToCart({ commit }, productId) {
      await api.addToCart(productId);
      commit('ADD_TO_CART', productId);
    },
    logout({ commit }) {
      commit('SET_TOKEN', null);
      localStorage.removeItem('token');
    },
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    ADD_TO_CART(state, productId) {
      
    },
  },
});