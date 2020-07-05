import { Inject } from "@nestjs/common";
import { Transaction } from "src/business/entity/transaction/transaction.entity";
import { TransactionPlain } from "src/business/entity/transaction/transaction.plain.entity";
import { TransactionQuery } from "src/business/query/transaction.query";
import { IAccountRepository } from "src/data/repository/contract/account.repository";
import { ICategoryRepository } from "src/data/repository/contract/category.repository";
import { ITransactionRepository } from "src/data/repository/contract/transaction.repository";

export class TransactionService implements ITransactionRepository {

    constructor(
        @Inject('ITransactionRepository') private readonly transactionRepository: ITransactionRepository,
        @Inject('IAccountRepository') private readonly accountRepository: IAccountRepository,
        @Inject('ICategoryRepository') private readonly categoryRepository: ICategoryRepository,
    ) { }

    public async create(transaction: TransactionPlain): Promise<TransactionPlain> {
        return this.transactionRepository.create(transaction);
    }

    public async edit(transactionId: number, transaction: TransactionPlain): Promise<TransactionPlain> {
        return this.transactionRepository.edit(transactionId, transaction);
    }

    public async delete(transactionId: number): Promise<void> {
        return this.transactionRepository.delete(transactionId);
    }

    public async get(query: TransactionQuery): Promise<Transaction[]> {
        const transactions = await this.transactionRepository.get(query) as any[];
        const accountIds = transactions.map(x => x.accountId);
        const accounts = await this.accountRepository.getByAccountIds(accountIds);
        const categoryIds = transactions
            .filter(x => x.categoryId)
            .map(x => x.categoryId);
        const categories = await this.categoryRepository.getByCategoryIds(categoryIds);
        const accountTargetIds = transactions
            .filter(x => x.accountTargetId)
            .map(x => x.accountTargetId);
        const accoutTargets = await this.accountRepository.getByAccountIds(accountTargetIds);
        transactions.forEach(t => {
            t.account = accounts.find(a => a.id === t.accountId);
            t.category = categories.find(c => c.id === t.categoryId) ?? null;
            t.targetAccount = accoutTargets.find(at => at.id === t.accountTargetId) ?? null;
        });
        return transactions;
    }

    public async haveRelation(userId: number, transactionId: number): Promise<boolean> {
        return this.transactionRepository.haveRelation(userId, transactionId);
    }
}