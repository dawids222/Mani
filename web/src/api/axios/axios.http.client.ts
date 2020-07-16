import axios from 'axios';
import { IHttpClient } from '../contract/http.client';
import { Account } from '../entity/account/account.entity';
import { Login } from '../entity/auth/login.entity';
import { Register } from '../entity/auth/register.entity';
import { Token } from '../entity/auth/token.entity';
import { Category } from '../entity/category/category.entity';
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

    public async getAllCategories(): Promise<Category[]> {
        return this.client
            .get('/categories')
            .then(x => x.data);
    }

    public async getTransactions(query: TransactionQuery): Promise<Transaction[]> {
        return this.client
            .get('/transactions', {
                params: query,
            })
            .then(x => x.data)
    }
}