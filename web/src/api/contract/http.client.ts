import { Account } from '../entity/account/account.entity';
import { Login } from '../entity/auth/login.entity';
import { Register } from '../entity/auth/register.entity';
import { Token } from '../entity/auth/token.entity';
import { CategoryCreate } from '../entity/category/category.create.entity';
import { Category } from '../entity/category/category.entity';
import { Settings } from '../entity/setting/settings.entity';
import { TransactionCreate } from '../entity/transactions/transaction.create.entity';
import { Transaction } from '../entity/transactions/transaction.entity';
import { User } from '../entity/user/user.entity';
import { TransactionQuery } from '../query/transaction.query';

export interface IHttpClient {
    login(data: Login): Promise<Token>;
    register(data: Register): Promise<User>;

    getAllAccounts(): Promise<Account[]>;
    getAccount(accountId: number): Promise<Account>;
    createAccount(account: Account): Promise<Account>;
    editAccount(account: Account): Promise<Account>;
    deleteAccount(accountId: number): Promise<void>;

    getAllCategories(): Promise<Category[]>;
    getCategory(categoryId: number): Promise<Category>;
    createCategory(category: CategoryCreate): Promise<CategoryCreate>;
    editCategory(category: CategoryCreate): Promise<CategoryCreate>;
    deleteCategory(categoryId: number): Promise<void>;

    getTransactions(query: TransactionQuery): Promise<Transaction[]>;
    getTransaction(transactionId: number): Promise<Transaction>;
    createTransaction(transaction: TransactionCreate): Promise<void>;
    editTransaction(transaction: TransactionCreate): Promise<Transaction>;
    deleteTransaction(transactionId: number): Promise<void>;

    getSettings(): Promise<Settings>;
}