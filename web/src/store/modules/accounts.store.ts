import httpClient from '@/api';
import { Account } from '@/api/entity/account/account.entity';
import { Module } from 'vuex';
import { ACCOUNTS } from '../types/accounts.types';

interface AccountsState {
    pending: boolean;
    accounts: Account[];
}

export const accountsStore: Module<AccountsState, any> = {
    state: {
        pending: false,
        accounts: [],
    },
    getters: {
        [ACCOUNTS.PENDING](state) { return state.pending; },
        [ACCOUNTS.ACCOUNTS](state) { return state.accounts; },
    },
    mutations: {
        [ACCOUNTS.PENDING](state, pending: boolean) { state.pending = pending; },
        [ACCOUNTS.ACCOUNTS](state, accounts: Account[]) { state.accounts = accounts; },
    },
    actions: {
        async [ACCOUNTS.GET_ALL]({ commit, state }) {
            commit(ACCOUNTS.PENDING, true);
            httpClient
                .getAllAccounts()
                .then(
                    accounts => { commit(ACCOUNTS.ACCOUNTS, accounts) },
                    error => { console.log(error) }
                )
                .finally(() => commit(ACCOUNTS.PENDING, false));
        }
    }
}