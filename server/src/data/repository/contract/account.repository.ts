import { Account } from "src/business/entity/account/account.entity";

export interface IAccountRepository {
    getAccountsByUserId(userId: number): Promise<Account[]>;
}