import store from '@/store';
import { AUTH } from '@/store/types/auth.types';
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import AccountCreate from '../components/accounts/Account.create.vue';
import Account from '../components/accounts/Account.vue';
import Accounts from '../components/accounts/Accounts.vue';
import Categories from '../components/categories/Categories.vue';
import Category from '../components/categories/Category.vue';
import Transactions from '../components/transactions/Transactions.vue';
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
      },
      {
        path: 'accounts/:id',
        name: 'Account',
        component: Account,
      }, {
        path: 'accounts-create',
        name: 'CreateAccount',
        component: AccountCreate,
      }, {
        path: 'categories',
        name: 'Categories',
        component: Categories,
      }, {
        path: 'category/:id',
        name: 'Category',
        component: Category,
      },
      {
        path: 'transactions',
        name: 'Transactions',
        component: Transactions,
      },
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
