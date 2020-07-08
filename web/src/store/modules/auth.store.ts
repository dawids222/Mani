import httpClient from '@/api';
import { Login } from '@/api/entity/auth/login.entity';
import router from '@/router';
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { AUTH } from '../types/auth.types';

interface Auth {
    token: string;
    pending: boolean;
}

const getters: GetterTree<Auth, any> = {
    [AUTH.PENDING](state) { return state.pending; },
    [AUTH.AUTHENTICATED](state) { return state.token !== ''; },
};

const actions: ActionTree<Auth, any> = {
    async [AUTH.LOGIN]({ commit }, data: Login) {
        commit(AUTH.TOKEN, true);
        httpClient
            .login(data)
            .then(
                result => {
                    commit(AUTH.TOKEN, result.token);
                    router.push({ name: 'Home' })
                },
                error => {
                    console.log(error);
                    return;
                }
            )
            .finally(() => {
                commit(AUTH.PENDING, false);
            });
    },
};

const mutations: MutationTree<Auth> = {
    [AUTH.TOKEN](state, token) { state.token = token; },
    [AUTH.PENDING](state, pending) { state.pending = pending; }
};

const state: Auth = {
    get token(): string {
        return localStorage.getItem('user-token') ?? '';
    },
    set token(value: string) {
        localStorage.setItem('user-token', value);
    },
    pending: false,
};

export const authStore: Module<Auth, any> = {
    state,
    getters,
    actions,
    mutations,
};