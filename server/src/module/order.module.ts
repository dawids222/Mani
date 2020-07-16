import { Module } from "@nestjs/common";
import { OrderController } from "src/controller/order.controller";
import { AccountAdapter } from "src/data/adapter/account/account.adapter";
import { CategoryAdapter } from "src/data/adapter/category/category.adapter";
import { OrderAdapter } from "src/data/adapter/order/order.adapter";
import { OrderPlainAdapter } from "src/data/adapter/order/order.plain.adapter";
import { AccountRepository } from "src/data/repository/postgres/account.repository";
import { CategoryRepository } from "src/data/repository/postgres/category.repository";
import { OrderRepository } from "src/data/repository/postgres/order.repository";
import { OrderService } from "src/service/order.service";
import { OrderPlainValidator } from "src/validation/validator/order.plain.validator";
import { OrderQueryValidator } from "src/validation/validator/order.query.validator";
import { BaseModule } from "./base.module";

@Module({
    imports: [
        BaseModule,
    ],
    controllers: [
        OrderController,
    ],
    providers: [{
        provide: 'IOrderRepository',
        useClass: OrderRepository,
    }, {
        provide: 'IOrderValidator',
        useClass: OrderPlainValidator,
    }, {
        provide: 'IOrderQueryValidator',
        useClass: OrderQueryValidator,
    }, {
        provide: 'IOrderPlainAdapter',
        useClass: OrderPlainAdapter,
    }, {
        provide: 'IOrderAdapter',
        useClass: OrderAdapter,
    }, {
        provide: 'IOrderService',
        useClass: OrderService,
    }, {
        provide: 'IAccountRepository',
        useClass: AccountRepository,
    }, {
        provide: 'ICategoryRepository',
        useClass: CategoryRepository,
    }, {
        provide: 'IAccountAdapter',
        useClass: AccountAdapter,
    }, {
        provide: 'ICategoryAdapter',
        useClass: CategoryAdapter,
    }],
})
export class OrderModule { }