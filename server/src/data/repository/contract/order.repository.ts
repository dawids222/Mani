import { Order } from "src/business/entity/order/order.entity";
import { OrderPlain } from "src/business/entity/order/order.plain";
import { TransactionPlain } from "src/business/entity/transaction/transaction.plain.entity";
import { OrderQuery } from "src/business/query/order.query";

export interface IOrderRepository {
    create(order: OrderPlain): Promise<Order>;
    edit(orderId: number, order: OrderPlain): Promise<Order>;
    delete(orderId: number): Promise<void>;
    get(userId: number, query: OrderQuery): Promise<Order[]>;
    getByOrderId(orderId: Number): Promise<Order>;
    haveRelation(userId: number, orderId: number): Promise<boolean>;
    trigger(): Promise<TransactionPlain[]>;
}