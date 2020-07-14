import httpClient from '@/api';
import { Login } from '@/api/entity/auth/login.entity';
import { Register } from '@/api/entity/auth/register.entity';
import router from '@/router';
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { AUTH } from '../types/auth.types';

interface AuthState {
    token: string;
    pending: boolean;
}

const getters: GetterTree<AuthState, any> = {
    [AUTH.PENDING](state) { return state.pending; },
    [AUTH.AUTHENTICATED](state) { return state.token !== ''; },
};

const actions: ActionTree<AuthState, any> = {
    async [AUTH.LOGIN]({ commit }, data: Login) {
        commit(AUTH.PENDING, true);
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
    async [AUTH.REGISTER]({ commit }, data: Register) {
        commit(AUTH.PENDING, true);
        httpClient
            .register(data)
            .then(
                result => {
                    router.push({ name: 'Login' })
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
    async [AUTH.SIGN_UP]() {
        router.push({ name: 'Register' });
    }
};

const mutations: MutationTree<AuthState> = {
    [AUTH.TOKEN](state, token) { state.token = token; },
    [AUTH.PENDING](state, pending) { state.pending = pending; }
};

const state: AuthState = {
    get token(): string {
        return localStorage.getItem('user-token') ?? '';
    },
    set token(value: string) {
        localStorage.setItem('user-token', value);
    },
    pending: false,
};

export const authStore: Module<AuthState, any> = {
    state,
    getters,
    actions,
    mutations,
};