import { Language } from './language';

export const english: Language = {
    notFound: 'Sorry, page not found',
    goHome: 'Go Home',
    loginHeader: 'Login',
    emailLabel: 'e-mail',
    passwordLabel: 'password',
    verifyPasswordLabel: 'verify password',
    loginButton: 'SUBMIT',
    dontHaveAnAccount: "Don't have an account?",
    signUp: 'Sign up',
    registerHeader: 'Register',
    accountsDrawerLabel: 'Accounts',
    categoriesDrawerLabel: 'Categories',
    transactionsDrawerLabel: 'Transactions',
    ordersDrawerLabel: 'Recurring orders',
    statisticsDrawerLabel: 'Statistics',
    accountMenuLabel: 'Account',
    logoutMenuLabel: 'Logout',
    dashboardDrawerLabel: 'Dashboard',
    fromLabel: 'From',
    toLabel: 'To',
    accountNameLabel: 'Name',
    accountBalanceLabel: 'Balance',
    accountDescriptionLabel: 'Description',
    accountExpenseLabel: 'expense',
    accountIncomeLabel: 'income',
    accountTransferLabel: 'transfer',
    save: 'save',
    delete: 'delete',
    avatarPickerColorLabel: 'color',
    avatarPickerLogoLabel: 'logo',
    cancel: 'cancel',
    search: 'Search',
    yes: 'yes',
    no: 'no',
    deleteDialogTitle: 'Warning!',
    deleteAccountDialogMessage: 'Are you sure you want to delete this account?',
    deleteCategoryDialogMessage: 'Are you sure you want to delete this category?',
    date: 'Date',
    transactionNameLabel: 'Name',
    transactionBalanceLabel: 'Balance',
    transactionValueLabel: 'Value',
    transactionDateLabel: 'Date',
    deleteTransactionDialogMessage: 'Are you sure you want to delete this transaction?',
    success: 'Success!',
    error: 'Error!',
    validationMessages: {
        required: 'this field is required',
        email: 'this field has to cantain valid e-maiol address',
        min: (_, params: any) => `this field has to contain minimum of ${params.length} characters`,
        max: (_, params: any) => `this field has to contain maximum of ${params.length} characters`,
        noWhiteSpaces: `this field can not contain white spaces`,
        restricted: `this fiels can not contain thise characters ;<>\\{}[]+=?&,:'"\`'`,
        confirmed: `content of the field is not the same`,
    },
}