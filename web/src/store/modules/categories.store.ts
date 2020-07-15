import httpClient from '@/api';
import { Category } from '@/api/entity/category/category.entity';
import { CategoryNormalized } from '@/api/entity/category/category.normalized.entity';
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
                const category = state.categories.find(x => x.id === id);
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
            const normalized = normalizeRelations(category, ['subcategories']);
            const index = state.categories.findIndex(x => x.id === category.id);
            if (index !== -1) { state.categories[index] = normalized; }
            else { state.categories.push(normalized); }
            category.subcategories.forEach(subcategory => {
                store.commit(CATEGORIES.ADD, subcategory);
            });
        }
    },
    actions: {
        [CATEGORIES.GET_ALL]({ commit }) {
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
        }
    },
}