import httpClient from '@/api';
import { Transaction } from '@/api/entity/transactions/transaction.entity';
import { TransactionNormalized } from "@/api/entity/transactions/transaction.normalized.entity";
import { Module } from 'vuex';
import store from '..';
import { normalizeRelations, resolveRelations } from '../helpers';
import { ACCOUNTS } from '../types/accounts.types';
import { CATEGORIES } from '../types/categories.types';
import { TRANSACTIONS } from '../types/transactions.types';

interface TransactionsState {
    pending: boolean;
    transactions: TransactionNormalized[];
}

export const transactionsStore: Module<TransactionsState, any> = {
    state: {
        pending: false,
        transactions: [],
    },
    getters: {
        [TRANSACTIONS.PENDING](state) { return state.pending; },
        [TRANSACTIONS.TRANSACTIONS](state, getters) {
            return state.transactions
                .map(x => getters[TRANSACTIONS.GET](x.id))
        },
        [TRANSACTIONS.GET](state, _, __, rootGetters) {
            return (id: number) => {
                const transaction = state.transactions.find(x => x.id === id);
                return resolveRelations(
                    transaction,
                    [
                        { prop: 'account', store: 'accounts' },
                        { prop: 'targetAccount', store: 'accounts' },
                        { prop: 'category', store: 'categories' }
                    ],
                    rootGetters,
                );
            }
        },
    },
    mutations: {
        [TRANSACTIONS.PENDING](state, pending: boolean) { state.pending = pending; },
        [TRANSACTIONS.ADD](state, transaction: Transaction) {
            const normalized = normalizeRelations(transaction, ['account', 'targetAccount', 'category']);
            const index = state.transactions.findIndex(x => x.id === transaction.id);
            if (index !== -1) { state.transactions[index] = normalized }
            else state.transactions.push(normalized);
            store.commit(ACCOUNTS.ADD, transaction.account);
            store.commit(ACCOUNTS.ADD, transaction.targetAccount);
            store.commit(CATEGORIES.ADD, transaction.category);
        }
    },
    actions: {
        [TRANSACTIONS.GET_ALL]({ commit, state }) {
            commit(TRANSACTIONS.PENDING, true);
            httpClient.getTransactions({
                page: 1,
                itemsPerPage: 10,
                from: '2020-05-10',
                to: '2020-10-10',
                categoryId: undefined,
                accountId: undefined,
                targetAccountId: undefined,
            })
                .then(
                    transactions => {
                        transactions.forEach(
                            transaction => {
                                commit(TRANSACTIONS.ADD, transaction);
                            }
                        )
                    },
                    error => {
                        console.log(error);
                    }
                )
                .finally(() => commit(TRANSACTIONS.PENDING, false))
        }
    },
}