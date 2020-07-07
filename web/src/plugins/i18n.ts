import { english } from '@/languages/english';
import { polish } from '@/languages/polish';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);
const messages = {
    en: english,
    pl: polish,
};
export default new VueI18n({ locale: 'pl', fallbackLocale: 'en', messages });