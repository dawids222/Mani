import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
import { accountsStore } from './modules/accounts.store';
import { authStore } from './modules/auth.store';
import { categoriesStore } from './modules/categories.store';
import { settingsStore } from './modules/settings.store';
import { transactionsStore } from './modules/transactions.store';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth: authStore,
    accounts: accountsStore,
    categories: categoriesStore,
    transactions: transactionsStore,
    settings: settingsStore,
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
})
