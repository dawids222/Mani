import { TransactionType } from '../enum/transaction.type';

export interface TransactionNormalized {
    id: number;
    name: string;
    type: TransactionType;
    value: number;
    date: string;
    account: number;
    targetAccount: number | null;
    category: number | null;
}