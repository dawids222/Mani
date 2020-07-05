import { TransactionType } from "src/business/enum/transaction.type";

export interface OrderPlain {
    name: string;
    type: TransactionType;
    value: number;
    isActive: boolean;
    triggerDays: number[];
    triggerMonths: number[];
    accountId: number;
    accountTargetId: number | null;
    categoryId: number | null;
}