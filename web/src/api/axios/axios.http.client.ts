import axios from 'axios';
import { IHttpClient } from '../contract/http.client';
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

export class AxiosHttpClient implements IHttpClient {

    private readonly client = axios.create({
        baseURL: 'http://localhost:3000',
        timeout: 1000,
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('user-token'),
        },
    });

    public async login(data: Login): Promise<Token> {
        return this.client
            .post('/users/login', data)
            .then(x => x.data);
    }

    public async register(data: Register): Promise<User> {
        return this.client
            .post('/users/register', data)
            .then(x => x.data);
    }

    public async getAllAccounts(): Promise<Account[]> {
        return this.client
            .get('/accounts')
            .then(x => x.data);
    }

    public async getAccount(accountId: number): Promise<Account> {
        return this.client
            .get(`/accounts/${accountId}`,)
            .then(x => x.data);
    }

    public async createAccount(account: Account): Promise<Account> {
        return this.client
            .post('/accounts', account)
            .then(x => x.data);
    }

    public async editAccount(account: Account): Promise<Account> {
        return this.client
            .put(`/accounts/${account.id}`, account)
            .then(x => x.data);
    }

    public async deleteAccount(accountId: number): Promise<void> {
        return this.client
            .delete(`/accounts/${accountId}`);
    }

    public async createCategory(category: CategoryCreate): Promise<CategoryCreate> {
        return this.client
            .post('/categories', category)
            .then(x => x.data);
    }

    public async getAllCategories(): Promise<Category[]> {
        return this.client
            .get('/categories')
            .then(x => x.data);
    }

    public async getCategory(categoryId: number) {
        return this.client
            .get(`/categories/${categoryId}`)
            .then(x => x.data);
    }

    public async editCategory(category: CategoryCreate) {
        return this.client
            .put(`/categories/${category.id}`, category)
            .then(x => x.data);
    }

    public async deleteCategory(categoryId: number) {
        return this.client
            .delete(`/categories/${categoryId}`)
            .then(x => x.data);
    }

    public async getSettings(): Promise<Settings> {
        return this.client
            .get('/settings')
            .then(x => x.data);
    }

    public async getTransactions(query: TransactionQuery): Promise<Transaction[]> {
        return this.client
            .get('/transactions', {
                params: query,
            })
            .then(x => x.data)
    }

    public async createTransaction(transaction: TransactionCreate): Promise<void> {
        return this.client
            .post('/transactions', transaction)
            .then((x) => x.data);
    }
}