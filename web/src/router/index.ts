import store from '@/store';
import { AUTH } from '@/store/types/auth.types';
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import About from '../views/About.vue';
import NotFound from '../views/errors/NotFound.vue';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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
