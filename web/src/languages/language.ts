import { LocaleMessageObject } from 'vue-i18n';

export interface Language extends LocaleMessageObject {
    notFound: string;
    goHome: string;
    loginHeader: string;
    emailLabel: string;
    passwordLabel: string;
    verifyPasswordLabel: string;
    loginButton: string;
    dontHaveAnAccount: string;
    signUp: string;
    registerHeader: string;
}