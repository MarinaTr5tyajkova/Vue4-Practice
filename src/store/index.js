import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/utils/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
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
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
  },
});