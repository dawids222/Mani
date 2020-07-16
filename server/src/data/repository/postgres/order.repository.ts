import { Inject } from "@nestjs/common";
import { Order } from "src/business/entity/order/order.entity";
import { OrderPlain } from "src/business/entity/order/order.plain";
import { TransactionPlain } from "src/business/entity/transaction/transaction.plain.entity";
import { OrderQuery } from "src/business/query/order.query";
import { IEntityAdapter } from "src/data/adapter/contract/entity.adapter";
import { postgres } from "src/data/context/postgres.context";
import { IOrderRepository } from "../contract/order.repository";

export class OrderRepository implements IOrderRepository {

    constructor(
        @Inject('IOrderPlainAdapter')
        private readonly orderPlainAdapter: IEntityAdapter<OrderPlain>,
    ) { }

    private readonly table = 'orders';

    public async create(order: OrderPlain): Promise<OrderPlain> {
        const o = order;
        return postgres
            .query(`
                INSERT INTO ${this.table}
                VALUES (default, $1, $2, $3, $4, $5, $6, $7, $8, $9)
                RETURNING id, name, type, value, active as "isActive", trigger_days AS "triggerDays", 
                trigger_months AS "triggerMonths", account_id AS "accountId", 
                account_target_id AS "accountTargetId", category_id as "categoryId";
            `, [o.name, o.type, o.value, o.isActive, o.triggerDays, o.triggerMonths,
            o.accountId, o.accountTargetId, o.categoryId])
            .then(x => x.rows[0]);
    }

    public async edit(orderId: number, order: OrderPlain): Promise<OrderPlain> {
        const o = order;
        return postgres
            .query(`
                UPDATE ${this.table} SET
                name = $1,
                type = $2,
                value = $3,
                active = $4,
                trigger_days = $5,
                trigger_months = $6,
                account_id = $7,
                account_target_id = $8,
                category_id = $9
                WHERE id = $10
                RETURNING id, name, type, value, active as "isActive", trigger_days AS "triggerDays", 
                trigger_months AS "triggerMonths", account_id AS "accountId", 
                account_target_id AS "accountTargetId", category_id as "categoryId";
            `, [o.name, o.type, o.value, o.isActive, o.triggerDays, o.triggerMonths,
            o.accountId, o.accountTargetId, o.categoryId, orderId])
            .then(x => x.rows[0]);
    }

    public async delete(orderId: number): Promise<void> {
        return postgres
            .query(`
                DELETE FROM ${this.table}
                WHERE id = $1;
            `, [orderId])
            .then(x => { });
    }

    public async get(userId: number, query: OrderQuery): Promise<Order[]> {
        return postgres
            .query(`
            SELECT o.id, o.name, o.type, o.value, o.active as "isActive", o.trigger_days as "triggerDays",
            o.trigger_months as "triggerMonths", o.account_id as "accountId", o.account_target_id as "accountTargetId",
            o.category_id as "categoryId"
            FROM orders o, accounts a, users u 
            WHERE 
            o.account_id = a.id AND
            a.user_id = u.id AND
            u.id = $1
            ${this.createQuerySection(query)}
            `, [userId])
            .then(x => this.orderPlainAdapter.adaptMany(x.rows) as any);
    }

    public async haveRelation(userId: number, orderId: number): Promise<boolean> {
        return postgres
            .query(`
                SELECT * 
                FROM users u, accounts a, orders o 
                WHERE 
                a.user_id = u.id AND 
                o.account_id = a.id AND 
                u.id = $1 AND 
                o.id = $2; 
            `, [userId, orderId])
            .then(x => x.rowCount > 0);
    }

    public async trigger(): Promise<TransactionPlain[]> {
        return postgres
            .query(`
                INSERT INTO transactions 
                (name, type, value, date, account_id, account_target_id, category_id)
                SELECT name, type, value, now(), account_id, account_target_id, category_id
                FROM ${this.table}
                WHERE 
                active = TRUE AND
                date_part('day', now()) = ANY(trigger_days) AND
                date_part('month', now()) = ANY(trigger_months)
                RETURNING id, name, type, value, date, account_id AS "accountId", 
                account_target_id AS "accountTargetId", category_id as "categoryId";
            `)
            .then(x => x.rows);
    }

    private createQuerySection(query: OrderQuery): string {
        let result = '';
        if (query.id) result += `AND id = ${query.id} `;
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