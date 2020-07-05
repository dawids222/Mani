import { Transaction } from "src/business/entity/transaction/transaction.entity";
import { TransactionPlain } from "src/business/entity/transaction/transaction.plain.entity";
import { TransactionQuery } from "src/business/query/transaction.query";

export interface ITransactionRepository {
    create(transaction: TransactionPlain): Promise<TransactionPlain>;
    edit(transactionId: number, transaction: TransactionPlain): Promise<TransactionPlain>;
    delete(transactionId: number): Promise<void>;
    get(userId: number, query: TransactionQuery): Promise<Transaction[]>;
    haveRelation(userId: number, transactionId: number): Promise<boolean>;
}