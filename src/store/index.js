import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/utils/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
    orders: [],
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
  },
  actions: {
    async fetchOrders({ commit }) {
      const response = await api.getOrders();
      commit('SET_ORDERS', response.data);
      return response;
    },
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_ORDERS(state, orders) {
      state.orders = orders;
    },
  },
});