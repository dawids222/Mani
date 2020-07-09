import { IHttpClient } from '../contract/http.client';
import { Login } from '../entity/auth/login.entity';
import { Register } from '../entity/auth/register.entity';
import { Token } from '../entity/auth/token.entity';
import { User } from '../entity/user/user.entity';

export class MockHttpClient implements IHttpClient {

    public async login(data: Login): Promise<Token> {
        await this.timeout(1000);
        return Promise.resolve({ token: 'fake token' });
    }

    public async register(data: Register): Promise<User> {
        await this.timeout(1000);
        return Promise.resolve({
            "id": 5,
            "email": "e@wp.pl",
            "type": 0
        });
    }

    private timeout(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}