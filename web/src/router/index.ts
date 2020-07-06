import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import About from '../views/About.vue';
import NotFound from '../views/errors/NotFound.vue';
import Home from '../views/Home.vue';

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
    path: '*',
    name: 'NotFound',
    component: NotFound,
  }
]

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: "active",
  routes
})

export default router
