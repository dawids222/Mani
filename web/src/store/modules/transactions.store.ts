import httpClient from '@/api';
import { TransactionCreate } from '@/api/entity/transactions/transaction.create.entity';
import { Transaction } from '@/api/entity/transactions/transaction.entity';
import { TransactionNormalized } from "@/api/entity/transactions/transaction.normalized.entity";
import { TransactionQuery } from '@/api/query/transaction.query';
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
            return (query?: TransactionQuery) => {
                let transactions = state.transactions;
                if (query) {
                    transactions = transactions.filter(x =>
                        Date.parse(x.date) >= Date.parse(query.from) &&
                        Date.parse(x.date) <= Date.parse(query.to) &&
                        (query.accountId ? x.account === query.accountId : true) &&
                        (query.categoryId ? x.category === query.categoryId : true) &&
                        (query.targetAccountId ? x.targetAccount === query.targetAccountId : true)
                    );
                }
                return transactions
                    .map(x => getters[TRANSACTIONS.GET](x.id))
            }
        },
        [TRANSACTIONS.GET](state, _, __, rootGetters) {
            return (id: number) => {
                const transaction = state.transactions.find(x => x.id === id);
                const result = resolveRelations(
                    transaction,
                    [
                        { prop: 'account', store: 'accounts' },
                        { prop: 'targetAccount', store: 'accounts' },
                        { prop: 'category', store: 'categories' }
                    ],
                    rootGetters,
                );
                return result;
            }
        },
    },
    mutations: {
        [TRANSACTIONS.PENDING](state, pending: boolean) { state.pending = pending; },
        [TRANSACTIONS.ADD](state, transaction: Transaction) {
            const normalized = normalizeRelations(transaction, ['account', 'targetAccount', 'category']);
            const index = state.transactions.findIndex(x => x.id === transaction.id);
            if (index !== -1) { Object.assign(state.transactions[index], normalized) }
            else state.transactions.push(normalized);
            store.commit(ACCOUNTS.ADD, transaction.account);
            store.commit(ACCOUNTS.ADD, transaction.targetAccount);
            store.commit(CATEGORIES.ADD, transaction.category);
        }
    },
    actions: {
        async [TRANSACTIONS.GET_ALL]({ commit, state }, query: TransactionQuery) {
            commit(TRANSACTIONS.PENDING, true);
            httpClient
                .getTransactions(query)
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
        },
        async [TRANSACTIONS.CREATE]({ commit, state }, transaction: TransactionCreate) {
            commit(TRANSACTIONS.PENDING, true);
            console.log(transaction)
            httpClient
                .createTransaction(transaction)
                .then(
                    result => {
                        commit(TRANSACTIONS.ADD, result)
                    },
                    error => { console.log(error) }
                )
                .finally(() => { commit(TRANSACTIONS.PENDING, false) })
        }
    },
}