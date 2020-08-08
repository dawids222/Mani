import { Inject } from "@nestjs/common";
import { Transaction } from "src/business/entity/transaction/transaction.entity";
import { TransactionPlain } from "src/business/entity/transaction/transaction.plain.entity";
import { TransactionQuery } from "src/business/query/transaction.query";
import { IEntityAdapter } from "src/data/adapter/contract/entity.adapter";
import { IAccountRepository } from "src/data/repository/contract/account.repository";
import { ICategoryRepository } from "src/data/repository/contract/category.repository";
import { ITransactionRepository } from "src/data/repository/contract/transaction.repository";

export class TransactionService implements ITransactionRepository {

    constructor(
        @Inject('ITransactionRepository')
        private readonly transactionRepository: ITransactionRepository,
        @Inject('IAccountRepository')
        private readonly accountRepository: IAccountRepository,
        @Inject('ICategoryRepository')
        private readonly categoryRepository: ICategoryRepository,
        @Inject('ITransactionAdapter')
        private readonly transactionAdapter: IEntityAdapter<Transaction>,
    ) { }

    public async create(transaction: TransactionPlain): Promise<Transaction> {
        const createResult = await this.transactionRepository.create(transaction);
        return this.getByTransactionId(createResult.id);
    }

    public async edit(transactionId: number, transaction: TransactionPlain): Promise<Transaction> {
        const editResult = await this.transactionRepository.edit(transactionId, transaction);
        return this.getByTransactionId(editResult.id);
    }

    public async delete(transactionId: number): Promise<void> {
        return this.transactionRepository.delete(transactionId);
    }

    public async get(userId: number, query: TransactionQuery): Promise<Transaction[]> {
        const transactions = await this.transactionRepository.get(userId, query) as any[];
        const accounts = await this.accountRepository.getByUserId(userId);
        const categories = await this.categoryRepository.getByUserId(userId);
        transactions.forEach(t => {
            t.account = accounts.find(a => a.id === t.accountId);
            t.category = categories.find(c => c.id === t.categoryId) ?? null;
            t.targetAccount = accounts.find(at => at.id === t.accountTargetId) ?? null;
        });
        return this.transactionAdapter.adaptMany(transactions);
    }

    public async getByTransactionId(transactionId): Promise<Transaction> {
        const transaction = await this.transactionRepository.getByTransactionId(transactionId) as any;
        const account = await this.accountRepository.getByAccountId(transaction.accountId);
        const targetAccount = await this.accountRepository.getByAccountId(transaction.accountTargetId);
        const category = await this.categoryRepository.getByCategoryId(transaction.categoryId);
        transaction.account = account;
        transaction.category = category;
        transaction.targetAccount = targetAccount;
        return this.transactionAdapter.adapt(transaction);
    }

    public async haveRelation(userId: number, transactionId: number): Promise<boolean> {
        return this.transactionRepository.haveRelation(userId, transactionId);
    }
}