import httpClient from '@/api';
import { Login } from '@/api/entity/auth/login.entity';
import router from '@/router';
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";

interface Auth {
    token: string;
    pending: boolean;
}

const getters: GetterTree<Auth, any> = {
    pending(state) { return state.pending; },
    isAuthenticated(state) { return state.token !== ''; },
};

const actions: ActionTree<Auth, any> = {
    async login({ commit }, data: Login) {
        commit('setPending', true);
        httpClient
            .login(data)
            .then(
                token => {
                    commit('setToken', token);
                    router.push({ name: 'Home' })
                },
                error => {
                    console.log(error);
                    return;
                }
            )
            .finally(() => {
                commit('setPending', false);
            });
    },
};

const mutations: MutationTree<Auth> = {
    setToken(state, token) { state.token = token; },
    setPending(state, pending) { state.pending = pending; }
};

const state: Auth = {
    get token() {
        return localStorage.getItem('user-token') ?? '';
    },
    set token(value: string) {
        localStorage.setItem('user-token', value);
    },
    pending: false,
};

export const authStore: Module<Auth, any> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};