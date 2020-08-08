import { Inject } from "@nestjs/common";
import { Account } from "src/business/entity/account/account.entity";
import { IEntityAdapter } from "src/data/adapter/contract/entity.adapter";
import { postgres } from "src/data/context/postgres.context";
import { IAccountRepository } from "../contract/account.repository";

export class AccountRepository implements IAccountRepository {

    constructor(
        @Inject('IAccountAdapter') private readonly accountAdapter: IEntityAdapter<Account>,
    ) { }

    public async create(account: Account, userId: number): Promise<Account> {
        return postgres
            .query(`
                INSERT INTO accounts
                VALUES (default, $1, $2, $3, $4, $5)
                RETURNING id, name, description, logo, color;
            `, [account.name, account.description, userId, account.logo, account.color])
            .then(x => {
                const result = x.rows[0];
                result.balance = 0;
                return result;
            });
    }

    public async edit(accountId: number, account: Account): Promise<Account> {
        await postgres.query(`
            UPDATE accounts SET 
            name = $1, 
            description = $2,
            logo = $3,
            color = $4
            WHERE id = $5;
        `, [account.name, account.description, account.logo, account.color, accountId]);
        return await this.getByAccountId(accountId);
    }

    public async delete(accountId: number): Promise<void> {
        await postgres.query(`
            UPDATE transactions SET 
            type=2, 
            value=-value, 
            account_target_id=null
            WHERE account_target_id = $1;
        `, [accountId]);
        await postgres.query(`
            UPDATE transactions SET 
            type=2, 
            account_id=account_target_id, 
            account_target_id=null
            WHERE account_id = $1 AND
            account_target_id<>null;;
        `, [accountId]);
        await postgres.query(`
            DELETE FROM accounts 
            WHERE id = $1; 
        `, [accountId]);
    }

    public async getByUserId(userId: number): Promise<Account[]> {
        return await this.getBy('user_id', userId);
    }

    public async getByAccountId(accountId: number): Promise<Account> {
        const rows = await this.getBy('id', accountId);
        return rows.length === 1 ? rows[0] : null;
    }

    public async getByAccountIds(accountIds: number[]): Promise<Account[]> {
        if (!accountIds.length) { return []; }
        return postgres
            .query(`
                SELECT a.id, a.name, a.description, a.logo, a.color
                FROM accounts a LEFT JOIN transactions t
                ON (t.account_id = a.id OR t.account_target_id = a.id)
                WHERE a.id IN (${accountIds.join(', ')})
                GROUP BY a.id;
            `, [])
            .then(x => this.accountAdapter.adaptMany(x.rows));
    }

    private async getBy(property: string, value: any): Promise<Account[]> {
        const result = await postgres
            .query(`
                SELECT a.id, a.name, 
                COALESCE(SUM(CASE 
                    WHEN t.type = 1 AND t.account_id = a.id 
                    THEN -t.value
                    ELSE t.value
                END), 0) AS balance,
                a.description, a.logo, a.color
                FROM accounts a LEFT JOIN transactions t
                ON (t.account_id = a.id OR t.account_target_id = a.id)
                WHERE a.${property} = $1
                GROUP BY a.id;
            `, [value]);
        return this.accountAdapter.adaptMany(result.rows);
    }
}