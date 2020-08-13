import { english } from '@/languages/english';
import { polish } from '@/languages/polish';
import * as VeeValidate from "vee-validate";
import * as rules from 'vee-validate/dist/rules';
import Vue from 'vue';
import i18n from './i18n';

for (const [rule, validation] of Object.entries(rules)) {
    VeeValidate.extend(rule, {
        ...validation
    });
}

VeeValidate.localize(i18n.locale);
VeeValidate.localize({
    en: {
        messages: english.validationMessages,
    },
    pl: {
        messages: polish.validationMessages,
    }
});

Vue.component('validation-provider', VeeValidate.ValidationProvider);
Vue.component('validation-observer', VeeValidate.ValidationObserver);

export default VeeValidate;