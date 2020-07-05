import { TransactionType } from "src/business/enum/transaction.type";

export class Order {
    constructor(
        public id: number,
        public name: string,
        public type: TransactionType,
        public value: number,
        public isActive: boolean,
        public triggerDays: number[],
        public triggerMonths: number[],
    ) { }
}