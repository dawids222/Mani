import httpClient from '@/api';
import { Account } from '@/api/entity/account/account.entity';
import router from '@/router';
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
        [ACCOUNTS.GET](state) {
            return (id: number) => {
                if (!id) { return null; }
                return state.accounts.find(x => x.id === id)
            }
        },
    },
    mutations: {
        [ACCOUNTS.PENDING](state, pending: boolean) { state.pending = pending; },
        [ACCOUNTS.ADD](state, account: Account) {
            if (!account) { return; }
            const index = state.accounts.findIndex(x => x.id === account.id);
            if (index !== -1) { state.accounts[index] = account; }
            else { state.accounts.push(account); }
        },
    },
    actions: {
        async [ACCOUNTS.LOAD_ALL]({ commit }) {
            commit(ACCOUNTS.PENDING, true);
            httpClient
                .getAllAccounts()
                .then(
                    accounts => {
                        accounts.forEach(account =>
                            commit(ACCOUNTS.ADD, account)
                        )
                    },
                    error => { console.log(error) }
                )
                .finally(() => commit(ACCOUNTS.PENDING, false));
        },
        async [ACCOUNTS.LOAD]({ commit }, accountId: number) {
            commit(ACCOUNTS.PENDING, true);
            httpClient
                .getAccount(accountId)
                .then(
                    account => {
                        commit(ACCOUNTS.ADD, account)
                    },
                    error => { console.log(error) }
                )
                .finally(() => commit(ACCOUNTS.PENDING, false));
        },
        async [ACCOUNTS.CREATE]({ commit }, account: Account) {
            commit(ACCOUNTS.PENDING, true);
            httpClient
                .createAccount(account)
                .then(
                    _ => { router.push({ name: "Accounts" }) },
                    error => { console.log(error) }
                )
                .finally(() => commit(ACCOUNTS.PENDING, false));
        },
        async [ACCOUNTS.DELETE]({ commit, state }, accountId: number) {
            commit(ACCOUNTS.PENDING, true);
            httpClient
                .deleteAccount(accountId)
                .then(
                    _ => {
                        const index = state.accounts.findIndex(x => x.id === accountId);
                        state.accounts.splice(index, 1);
                        router.push({ name: "Accounts" })
                    },
                    error => { console.log(error) }
                )
                .finally(() => commit(ACCOUNTS.PENDING, false));
        }
    }
}