import { Inject } from "@nestjs/common";
import { IOrderRepository } from "src/data/repository/contract/order.repository";
import { ILogger } from "src/util/logger/contract/logger";
import { IScheduler } from "../contract/scheduler";
const schedule = require('node-schedule');

export class NodeScheduleScheduler implements IScheduler {

    constructor(
        @Inject('IOrderRepository') private readonly orderRepository: IOrderRepository,
        @Inject('ILogger') private readonly logger: ILogger,
    ) { }

    public scheduleJobs() {
        const rule = new schedule.RecurrenceRule();
        rule.hour = 0;
        schedule.scheduleJob(rule, async () => {
            await this.orderRepository.trigger();
            this.logger.info('TRIGGERED SCHEDULED ORDERS');
        });
    }
}