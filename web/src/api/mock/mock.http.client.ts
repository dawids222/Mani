import { IHttpClient } from '../contract/http.client';
import { Account } from '../entity/account/account.entity';
import { Login } from '../entity/auth/login.entity';
import { Register } from '../entity/auth/register.entity';
import { Token } from '../entity/auth/token.entity';
import { Category } from '../entity/category/category.entity';
import { User } from '../entity/user/user.entity';
import { TransactionQuery } from '../query/transaction.query';

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

    public async getTransactions(query: TransactionQuery): Promise<any[]> {
        return [
            {
                "id": 1,
                "name": "zakupy w żabce",
                "type": 0,
                "value": -400,
                "date": "1996-12-20T23:00:00.000Z",
                "accountId": 4,
                "accountTargetId": null,
                "categoryId": 6,
                "account": {
                    "id": 4,
                    "name": "NEST konto",
                    "description": "nowy opis"
                },
                "category": {
                    "id": 6,
                    "name": "zdrowie",
                    "logo": "add",
                    "color": "#005000",
                    "subcategories": []
                },
                "targetAccount": null
            },
            {
                "id": 4,
                "name": "zakupy w żabce",
                "type": 1,
                "value": 400,
                "date": "1996-12-20T23:00:00.000Z",
                "accountId": 4,
                "accountTargetId": 21,
                "categoryId": null,
                "account": {
                    "id": 4,
                    "name": "NEST konto",
                    "description": "nowy opis"
                },
                "category": null,
                "targetAccount": {
                    "id": 21,
                    "name": "ING konto",
                    "description": "opis 2"
                }
            },
            {
                "id": 5,
                "name": "zakupy w żabce",
                "type": 2,
                "value": 1000,
                "date": "1996-12-20T23:00:00.000Z",
                "accountId": 4,
                "accountTargetId": null,
                "categoryId": null,
                "account": {
                    "id": 4,
                    "name": "NEST konto",
                    "description": "nowy opis"
                },
                "category": null,
                "targetAccount": null
            },
            {
                "id": 6,
                "name": "zakupy w żabce",
                "type": 3,
                "value": 1000,
                "date": "1996-12-20T23:00:00.000Z",
                "accountId": 4,
                "accountTargetId": null,
                "categoryId": null,
                "account": {
                    "id": 4,
                    "name": "NEST konto",
                    "description": "nowy opis"
                },
                "category": null,
                "targetAccount": null
            },
            {
                "id": 15,
                "name": "za studia",
                "type": 0,
                "value": 550,
                "date": "2020-07-04T22:00:00.000Z",
                "accountId": 4,
                "accountTargetId": null,
                "categoryId": 3,
                "account": {
                    "id": 4,
                    "name": "NEST konto",
                    "description": "nowy opis"
                },
                "category": {
                    "id": 3,
                    "name": "zdrowie",
                    "logo": "add",
                    "color": "#005000",
                    subcategories: []
                },
                "targetAccount": null
            },
            {
                "id": 16,
                "name": "za studia",
                "type": 0,
                "value": 550,
                "date": "2020-07-04T22:00:00.000Z",
                "accountId": 4,
                "accountTargetId": null,
                "categoryId": 3,
                "account": {
                    "id": 4,
                    "name": "NEST konto",
                    "description": "nowy opis"
                },
                "category": {
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
                "targetAccount": null
            }
        ];
    }

    private timeout(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}