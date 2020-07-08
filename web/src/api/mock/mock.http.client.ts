import { IHttpClient } from '../contract/http.client';
import { Login } from '../entity/auth/login.entity';
import { Token } from '../entity/auth/token.entity';

export class MockHttpClient implements IHttpClient {

    public async login(data: Login): Promise<Token> {
        return Promise.resolve({ token: 'fake token' });
    }
}