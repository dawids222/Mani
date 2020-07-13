import store from '@/store';
import { AUTH } from '@/store/types/auth.types';
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Accounts from '../components/Accounts.vue';
import About from '../views/About.vue';
import Dashboard from '../views/Dashboard.vue';
import NotFound from '../views/errors/NotFound.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    alias: '/dashboard',
    name: 'Home',
    component: Dashboard,
    children: [
      {
        path: 'accounts',
        name: 'Accounts',
        component: Accounts,
      }
    ],
  }, {
    path: '/about',
    name: 'About',
    component: About,
  }, {
    path: '/login',
    name: 'Login',
    component: Login,
  }, {
    path: '/register',
    name: 'Register',
    component: Register,
  }, {
    path: '*',
    name: 'NotFound',
    component: NotFound,
  }
]

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: "active",
  routes
});

router.beforeEach((to, from, next) => {
  if (
    !store.getters[AUTH.AUTHENTICATED] &&
    from.name !== 'Login' &&
    to.name !== 'Login'
  ) {
    router.push({ name: 'Login' });
  }
  next();
})

export default router
