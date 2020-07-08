import { Account } from "src/business/entity/account/account.entity";

export interface IAccountRepository {
    create(account: Account, userId: number): Promise<Account>;
    edit(accountId: number, account: Account): Promise<Account>;
    delete(accountId: number): Promise<void>;
    getByUserId(userId: number): Promise<Account[]>;
    getByAccountId(accountId: number): Promise<Account>;
    getByAccountIds(accountIds: number[]): Promise<Account[]>;
}