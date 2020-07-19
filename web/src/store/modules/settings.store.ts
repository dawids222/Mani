import httpClient from '@/api';
import { Settings } from '@/api/entity/setting/settings.entity';
import { Module } from 'vuex';
import { SETTINGS } from '../types/settings.types';

interface SettingsState {
    settings: Settings,
}

export const settingsStore: Module<SettingsState, any> = {
    state: {
        settings: {
            currency: '',
        }
    },
    getters: {
        [SETTINGS.CURRENCY](state) { return state.settings.currency; }
    },
    mutations: {
        [SETTINGS.SETTINGS](state, settings) {
            state.settings = settings;
        }
    },
    actions: {
        [SETTINGS.GET]({ commit }) {
            httpClient
                .getSettings()
                .then(
                    settings => {
                        commit(SETTINGS.SETTINGS, settings);
                    },
                    error => {
                        console.log(error);
                    }
                )
                .finally(() => { return; })
        }
    },
}