import { TransactionType } from '../enum/transaction.type';

export interface TransactionCreate {
    id: number;
    name: string;
    type: TransactionType;
    value: number;
    date: string;
    accountId: number;
    accountTargetId: number | null;
    categoryId: number | null;
}