import { Module } from "@nestjs/common";
import { OrderRepository } from "src/data/repository/postgres/order.repository";
import { NodeScheduleScheduler } from "src/scheduler/node-schedule/scheduler";
import { BaseModule } from "./base.module";

const scheduler = {
    provide: 'IScheduler',
    useClass: NodeScheduleScheduler,
}

@Module({
    imports: [
        BaseModule,
    ],
    providers: [
        scheduler, {
            provide: 'IOrderRepository',
            useClass: OrderRepository,
        }
    ],
    exports: [
        scheduler,
    ]
})
export class SchedulerModule { }