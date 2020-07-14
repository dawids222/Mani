import { IHttpClient } from '../contract/http.client';
import { Account } from '../entity/account/account.entity';
import { Login } from '../entity/auth/login.entity';
import { Register } from '../entity/auth/register.entity';
import { Token } from '../entity/auth/token.entity';
import { Category } from '../entity/category/category.entity';
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

    public async getAllAccounts(): Promise<Account[]> {
        const accounts = [];
        for (let i = 0; i < 5; i++) {
            accounts.push({
                id: i,
                logo: "attach_money",
                color: "primary",
                name: "Nest konto",
                balance: 8896,
                description: "coś tam, nie wiem..."
            });
        }
        return Promise.resolve(accounts);
    }

    public async getAllCategories(): Promise<Category[]> {
        return Promise.resolve([
            {
                "id": 2,
                "name": "jedzenie",
                "logo": "add",
                "color": "#ab4576",
                "subcategories": []
            },
            {
                "id": 3,
                "name": "zdrowie",
                "logo": "add",
                "color": "#005000",
                "subcategories": [
                    {
                        "id": 6,
                        "name": "kosmetyki",
                        "logo": "add",
                        "color": "#005000",
                        "subcategories": []
                    },
                    {
                        "id": 7,
                        "name": "leki",
                        "logo": "add",
                        "color": "#005000",
                        "subcategories": []
                    }
                ]
            },
            {
                "id": 1,
                "name": "samochód",
                "logo": "add",
                "color": "#39a5ff",
                "subcategories": []
            }
        ])
    }

    private timeout(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}