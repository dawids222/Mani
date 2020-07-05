import { Module } from "@nestjs/common";
import { OrderController } from "src/controller/order.controller";
import { OrderRepository } from "src/data/repository/postgres/order.repository";
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
    }],
})
export class OrderModule { }