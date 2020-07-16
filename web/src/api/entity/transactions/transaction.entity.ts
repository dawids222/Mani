import { Account } from '../account/account.entity';
import { Category } from '../category/category.entity';
import { TransactionType } from '../enum/transaction.type';

export interface Transaction {
    id: number;
    name: string;
    type: TransactionType;
    value: number;
    date: string;
    account: Account;
    targetAccount: Account | null;
    category: Category | null;
}