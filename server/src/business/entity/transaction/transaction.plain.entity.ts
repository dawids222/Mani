import { TransactionType } from "src/business/enum/transaction.type";

export interface TransactionPlain {
    name: string;
    type: TransactionType;
    value: number;
    date: string;
    accountId: number;
    accountTargetId: number | null;
    categoryId: number | null;
}