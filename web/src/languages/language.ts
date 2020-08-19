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
    accountsDrawerLabel: string;
    categoriesDrawerLabel: string;
    transactionsDrawerLabel: string;
    ordersDrawerLabel: string;
    statisticsDrawerLabel: string;
    accountMenuLabel: string;
    logoutMenuLabel: string;
    dashboardDrawerLabel: string;
    fromLabel: string;
    toLabel: string;
    accountNameLabel: string;
    accountBalanceLabel: string;
    accountDescriptionLabel: string;
    accountTransferLabel: string;
    accountExpenseLabel: string;
    accountIncomeLabel: string;
    save: string;
    delete: string;
    avatarPickerLogoLabel: string;
    avatarPickerColorLabel: string;
    search: string;
    cancel: string;
    yes: string;
    no: string;
    deleteDialogTitle: string;
    deleteAccountDialogMessage: string;
    deleteCategoryDialogMessage: string;
    date: string;
    transactionNameLabel: string;
    transactionBalanceLabel: string;
    transactionValueLabel: string;
    transactionDateLabel: string;
    deleteTransactionDialogMessage: string;
    success: string;
    error: string;
    validationMessages: {
        required: string;
        email: string;
        min: (name: string, params: any) => string;
        max: (name: string, params: any) => string;
        noWhiteSpaces: string;
        restricted: string;
        confirmed: string;
    };
}