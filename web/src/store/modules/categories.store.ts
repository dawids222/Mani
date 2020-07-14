import httpClient from '@/api';
import { Category } from '@/api/entity/category/category.entity';
import { Module } from 'vuex';
import { CATEGORIES } from '../types/categories.types';

interface CategoriesState {
    pending: boolean;
    categories: Category[];
}

export const categoriesStore: Module<CategoriesState, any> = {
    state: {
        pending: false,
        categories: [],
    },
    getters: {
        [CATEGORIES.PENDING](state) { return state.pending; },
        [CATEGORIES.CATEGORIES](state) { return state.categories; }

    },
    mutations: {
        [CATEGORIES.PENDING](state, pending: boolean) { state.pending = pending; },
        [CATEGORIES.CATEGORIES](state, categories: Category[]) { state.categories = categories; }
    },
    actions: {
        [CATEGORIES.GET_ALL]({ commit }) {
            commit(CATEGORIES.PENDING, true);
            httpClient
                .getAllCategories()
                .then(
                    categories => {
                        commit(CATEGORIES.CATEGORIES, categories);
                    },
                    error => { return; },
                )
                .finally(() => { commit(CATEGORIES.PENDING, false) });
        }
    },
}