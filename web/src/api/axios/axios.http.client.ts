import axios from 'axios';
import { IHttpClient } from '../contract/http.client';
import { Login } from '../entity/auth/login.entity';
import { Token } from '../entity/auth/token.entity';

export class AxiosHttpClient implements IHttpClient {

    private readonly client = axios.create({
        baseURL: 'http://localhost:3000',
        timeout: 1000,
        headers: {
            "Content-Type": "application/json",
        }
    });

    public async login(data: Login): Promise<Token> {
        return this.client
            .post('/users/login', data)
            .then(x => x.data);
    }
}