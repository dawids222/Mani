import { Module } from "@nestjs/common";
import { TransactionController } from "src/controller/transaction.controller";
import { CategoryAdapter } from "src/data/adapter/category/category.adapter";
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
    }],
})
export class TransactionModule { }