import httpClient from '@/api';
import { CategoryCreate } from '@/api/entity/category/category.create.entity';
import { Category } from '@/api/entity/category/category.entity';
import { CategoryNormalized } from '@/api/entity/category/category.normalized.entity';
import router from '@/router';
import { Module } from 'vuex';
import store from '..';
import { normalizeRelations, resolveRelations } from '../helpers';
import { CATEGORIES } from '../types/categories.types';

interface CategoriesState {
    pending: boolean;
    categories: CategoryNormalized[];
}

export const categoriesStore: Module<CategoriesState, any> = {
    state: {
        pending: false,
        categories: [],
    },
    getters: {
        [CATEGORIES.PENDING](state) { return state.pending; },
        [CATEGORIES.MAINS](state, getters) {
            const categories: Category[] = getters[CATEGORIES.CATEGORIES]
            return (categories
                .filter(category => categories
                    .every(c => c.subcategories
                        .every(subcategory => subcategory.id !== category.id)
                    )
                )
            )
        },
        [CATEGORIES.CATEGORIES](state, getters) {
            return state.categories
                .map(x => getters[CATEGORIES.GET](x.id))
        },
        [CATEGORIES.GET](state, _, __, rootGetters) {
            return (id: number) => {
                if (!id) { return null; }
                const category = state.categories.find(x => x.id === id);
                if (!category) { return null; }
                return resolveRelations(
                    category,
                    [{ prop: 'subcategories', store: 'categories' }],
                    rootGetters,
                );
            }
        },
    },
    mutations: {
        [CATEGORIES.PENDING](state, pending: boolean) { state.pending = pending; },
        [CATEGORIES.ADD](state, category: Category) {
            if (!category) { return; }
            const normalized = normalizeRelations(category, ['subcategories']);
            const index = state.categories.findIndex(x => x.id === category.id);
            if (index !== -1) { Object.assign(state.categories[index], normalized) }
            else { state.categories.push(normalized); }
            category.subcategories.forEach(subcategory => {
                store.commit(CATEGORIES.ADD, subcategory);
            });
        }
    },
    actions: {
        async [CATEGORIES.LOAD_ALL]({ commit }) {
            commit(CATEGORIES.PENDING, true);
            httpClient
                .getAllCategories()
                .then(
                    categories => {
                        categories.forEach(category =>
                            commit(CATEGORIES.ADD, category)
                        )
                    },
                    error => { return; },
                )
                .finally(() => { commit(CATEGORIES.PENDING, false) });
        },
        async [CATEGORIES.LOAD]({ commit }, categoryId: number) {
            commit(CATEGORIES.PENDING, true);
            httpClient
                .getCategory(categoryId)
                .then(
                    category => {
                        commit(CATEGORIES.ADD, category);
                    },
                    error => { return; },
                )
                .finally(() => { commit(CATEGORIES.PENDING, false) });
        },
        async [CATEGORIES.CREATE]({ commit }, category: CategoryCreate) {
            commit(CATEGORIES.PENDING, true);
            httpClient
                .createCategory(category)
                .then(
                    _ => { router.push({ name: 'Categories' }); },
                    error => { return; }
                )
                .finally(() => commit(CATEGORIES.PENDING, false));
        },
        async [CATEGORIES.DELETE]({ commit, state }, categoryId: number) {
            commit(CATEGORIES.PENDING, true);
            httpClient
                .deleteCategory(categoryId)
                .then(
                    success => {
                        const index = state.categories.findIndex(x => x.id === categoryId);
                        state.categories.splice(index, 1);
                        router.push({ name: 'Categories' });
                    },
                    error => { return; }
                )
                .finally(() => commit(CATEGORIES.PENDING, false));
        }
    },
}