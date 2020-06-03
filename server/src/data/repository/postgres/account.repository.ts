import { Injectable } from "@nestjs/common";
import { Account } from "src/business/entity/account/account.entity";
import { postgres } from "src/data/context/postgres.context";
import { IAccountRepository } from "../contract/account.repository";

@Injectable()
export class AccountRepository implements IAccountRepository {

    public getAccountsByUserId(userId: number): Promise<Account[]> {
        return postgres.query(`
            SELECT a.id, a.name, 
            COALESCE(SUM(CASE 
                WHEN t.type = 1 AND t.account_id = a.id 
                THEN -t.value
                ELSE t.value
            END), 0) AS balance,
            a.income, a.update_day AS "updateDay"
            FROM accounts a LEFT JOIN transactions t
            ON (t.account_id = a.id OR t.account_target_id = a.id)
            WHERE a.user_id = ${userId}
            GROUP BY a.id;
        `).then(x => x.rows);
    }
}