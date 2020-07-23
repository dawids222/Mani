import { Account } from '../entity/account/account.entity';
import { Login } from '../entity/auth/login.entity';
import { Register } from '../entity/auth/register.entity';
import { Token } from '../entity/auth/token.entity';
import { Category } from '../entity/category/category.entity';
import { Settings } from '../entity/setting/settings.entity';
import { Transaction } from '../entity/transactions/transaction.entity';
import { User } from '../entity/user/user.entity';
import { TransactionQuery } from '../query/transaction.query';

export interface IHttpClient {
    login(data: Login): Promise<Token>;
    register(data: Register): Promise<User>;
    getAllAccounts(): Promise<Account[]>;
    getAccount(accountId: number): Promise<Account>;
    createAccount(account: Account): Promise<void>;
    deleteAccount(accountId: number): Promise<void>;
    getAllCategories(): Promise<Category[]>;
    getTransactions(query: TransactionQuery): Promise<Transaction[]>;
    getSettings(): Promise<Settings>;
}