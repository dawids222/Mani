import { Module } from "@nestjs/common";
import { TransactionController } from "src/controller/transaction.controller";
import { AccountAdapter } from "src/data/adapter/account/account.adapter";
import { CategoryAdapter } from "src/data/adapter/category/category.adapter";
import { TransactionAdapter } from "src/data/adapter/transaction/transaction.adapter";
import { TransactionPlainAdapter } from "src/data/adapter/transaction/transaction.plain.adapter";
import { AccountRepository } from "src/data/repository/postgres/account.repository";
import { CategoryRepository } from "src/data/repository/postgres/category.repository";
import { TransactionRepository } from "src/data/repository/postgres/transaction.repository";
import { TransactionService } from "src/service/transaction.service";
import { TransactionPlainValidator } from "src/validation/validator/transaction.plain.validator";
import { TransactionQueryValidator } from "src/validation/validator/transaction.query.validator";
import { BaseModule } from "./base.module";

@Module({
    imports: [
        BaseModule,
    ],
    controllers: [
        TransactionController
    ],
    providers: [{
        provide: 'ITransactionRepository',
        useClass: TransactionRepository,
    }, {
        provide: 'IAccountRepository',
        useClass: AccountRepository,
    }, {
        provide: 'ICategoryRepository',
        useClass: CategoryRepository,
    }, {
        provide: 'ITransactionService',
        useClass: TransactionService,
    }, {
        provide: 'ICategoryAdapter',
        useClass: CategoryAdapter,
    }, {
        provide: 'ITransactionPlainValidator',
        useClass: TransactionPlainValidator,
    }, {
        provide: 'ITransactionQueryValidator',
        useClass: TransactionQueryValidator,
    }, {
        provide: 'IAccountAdapter',
        useClass: AccountAdapter,
    }, {
        provide: 'ITransactionAdapter',
        useClass: TransactionAdapter,
    }, {
        provide: 'ITransactionPlainAdapter',
        useClass: TransactionPlainAdapter,
    }],
})
export class TransactionModule { }