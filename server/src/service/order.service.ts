import { Inject } from "@nestjs/common";
import { Order } from "src/business/entity/order/order.entity";
import { OrderPlain } from "src/business/entity/order/order.plain";
import { TransactionPlain } from "src/business/entity/transaction/transaction.plain.entity";
import { OrderQuery } from "src/business/query/order.query";
import { IEntityAdapter } from "src/data/adapter/contract/entity.adapter";
import { IAccountRepository } from "src/data/repository/contract/account.repository";
import { ICategoryRepository } from "src/data/repository/contract/category.repository";
import { IOrderRepository } from "src/data/repository/contract/order.repository";

export class OrderService implements IOrderRepository {

    constructor(
        @Inject('IOrderRepository')
        private readonly orderRepository: IOrderRepository,
        @Inject('IAccountRepository')
        private readonly accountRepository: IAccountRepository,
        @Inject('ICategoryRepository')
        private readonly categoryRepository: ICategoryRepository,
        @Inject('IOrderAdapter')
        private readonly orderAdapter: IEntityAdapter<Order>,
    ) { }

    public async create(order: OrderPlain): Promise<OrderPlain> {
        return this.orderRepository.create(order);
    }

    public async edit(orderId: number, order: OrderPlain): Promise<OrderPlain> {
        return this.orderRepository.edit(orderId, order);
    }

    public async delete(orderId: number): Promise<void> {
        return this.orderRepository.delete(orderId);
    }

    public async get(userId: number, query: OrderQuery): Promise<Order[]> {
        const orders = await this.orderRepository.get(userId, query) as any[];
        const accounts = await this.accountRepository.getByUserId(userId);
        const categories = await this.categoryRepository.getByUserId(userId);
        orders.forEach(t => {
            t.account = accounts.find(a => a.id === t.accountId);
            t.category = categories.find(c => c.id === t.categoryId) ?? null;
            t.targetAccount = accounts.find(at => at.id === t.accountTargetId) ?? null;
        });
        return this.orderAdapter.adaptMany(orders);
    }

    public async haveRelation(userId: number, orderId: number): Promise<boolean> {
        return this.orderRepository.haveRelation(userId, orderId);
    }

    public async trigger(): Promise<TransactionPlain[]> {
        return this.orderRepository.trigger();
    }
}