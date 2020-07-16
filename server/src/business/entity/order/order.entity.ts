import { TransactionType } from "src/business/enum/transaction.type";
import { Account } from "../account/account.entity";
import { Category } from "../category/category.entity";

export class Order {
    constructor(
        public id: number,
        public name: string,
        public type: TransactionType,
        public value: number,
        public isActive: boolean,
        public triggerDays: number[],
        public triggerMonths: number[],
        public account: Account,
        public targetAccount: Account | null = null,
        public category: Category | null = null,
    ) { }
}