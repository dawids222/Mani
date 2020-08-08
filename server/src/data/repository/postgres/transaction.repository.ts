import { Inject } from "@nestjs/common";
import { Transaction } from "src/business/entity/transaction/transaction.entity";
import { TransactionPlain } from "src/business/entity/transaction/transaction.plain.entity";
import { TransactionQuery } from "src/business/query/transaction.query";
import { IEntityAdapter } from "src/data/adapter/contract/entity.adapter";
import { postgres } from "src/data/context/postgres.context";
import { ITransactionRepository } from "../contract/transaction.repository";

export class TransactionRepository implements ITransactionRepository {

    constructor(
        @Inject('ITransactionPlainAdapter')
        private readonly transactionPlainAdapter: IEntityAdapter<TransactionPlain>,
    ) { }
    getByTransactionId(transactionId: number): Promise<Transaction> {
        throw new Error("Method not implemented.");
    }

    private readonly table = 'transactions';

    public async create(transaction: TransactionPlain): Promise<Transaction> {
        const t = transaction;
        return postgres
            .query(`
                INSERT INTO ${this.table}
                VALUES (default, $1, $2, $3, $4, $5, $6, $7)
                RETURNING id, name, type, value, date, account_id AS "accountId",
                account_target_id AS "accountTargetId", category_id AS "categoryId";
            `, [t.name, t.type, t.value, t.date, t.accountId, t.accountTargetId, t.categoryId])
            .then(x => x.rows[0]);
    }

    public async edit(transactionId: number, transaction: TransactionPlain): Promise<Transaction> {
        const t = transaction;
        return postgres
            .query(`
                UPDATE ${this.table} SET
                name = $1,
                type = $2,
                value = $3,
                date = $4,
                account_id = $5,
                account_target_id = $6,
                category_id = $7
                WHERE id = $8
                RETURNING id, name, type, value, date, account_id AS "accountId",
                account_target_id AS "accountTargetId", category_id AS "categoryId";
            `, [t.name, t.type, t.value, t.date, t.accountId, t.accountTargetId, t.categoryId, transactionId])
            .then(x => x.rows[0]);
    }

    public async delete(transactionId: number): Promise<void> {
        return postgres
            .query(`
                DELETE FROM ${this.table}
                WHERE id = $1;
            `, [transactionId])
            .then(x => { });
    }

    public async get(userId: number, query: TransactionQuery): Promise<Transaction[]> {
        return postgres
            .query(`
                SELECT t.id, t.name, t.type, t.value, t.date, t.account_id AS "accountId",
                t.account_target_id AS "accountTargetId", t.category_id AS "categoryId"
                FROM ${this.table} t, accounts a, users u
                WHERE 
                t.account_id = a.id AND
                a.user_id = u.id AND
                u.id = $1 AND
                ${this.createQuerySection(query)}
            `, [userId])
            .then(x => this.transactionPlainAdapter.adaptMany(x.rows) as any);
    }

    public async getByOrderId(transactionId: number): Promise<Transaction> {
        return postgres
            .query(`
                SELECT t.id, t.name, t.type, t.value, t.date, t.account_id AS "accountId",
                t.account_target_id AS "accountTargetId", t.category_id AS "categoryId"
                FROM ${this.table} t, accounts a, users u
                WHERE 
                t.account_id = a.id AND
                a.user_id = u.id AND
                t.id = $1
            `, [transactionId])
            .then(x => this.transactionPlainAdapter.adapt(x.rows[0]) as any);
    }

    public async haveRelation(userId: number, transactionId: number): Promise<boolean> {
        return postgres
            .query(`
                SELECT * 
                FROM users u, accounts a, transactions t 
                WHERE 
                a.user_id = u.id AND 
                t.account_id = a.id AND 
                u.id = $1 AND 
                t.id = $2; 
            `, [userId, transactionId])
            .then(x => x.rowCount > 0);
    }

    private createQuerySection(query: TransactionQuery): string {
        let result = '';
        result += `date BETWEEN '${query.from}' AND '${query.to}' `;
        if (query.accountId) result += `AND account_id = ${query.accountId} `;
        if (query.categoryId) result += `AND category_id = ${query.categoryId} `;
        if (query.targetAccountId) result += `AND account_target_id = ${query.targetAccountId} `
        if (query.itemsPerPage && query.itemsPerPage) {
            result += `OFFSET ${(query.page - 1) * query.itemsPerPage} `
            result += `LIMIT ${query.itemsPerPage} `;
        }
        return result;
    }
}