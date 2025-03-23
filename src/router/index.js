import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home.vue';
import Register from '@/components/Register.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/register', component: Register },
  ],
});