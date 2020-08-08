import { Transaction } from "src/business/entity/transaction/transaction.entity";
import { TransactionPlain } from "src/business/entity/transaction/transaction.plain.entity";
import { TransactionQuery } from "src/business/query/transaction.query";

export interface ITransactionRepository {
    create(transaction: TransactionPlain): Promise<Transaction>;
    edit(transactionId: number, transaction: TransactionPlain): Promise<Transaction>;
    delete(transactionId: number): Promise<void>;
    get(userId: number, query: TransactionQuery): Promise<Transaction[]>;
    getByTransactionId(transactionId: number): Promise<Transaction>;
    haveRelation(userId: number, transactionId: number): Promise<boolean>;
}