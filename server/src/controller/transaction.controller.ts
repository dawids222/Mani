import { BadRequestException, Body, ConflictException, Controller, Delete, Get, HttpCode, Inject, Param, Post, Put, Query, Request, UseGuards } from "@nestjs/common";
import { TransactionPlain } from "src/business/entity/transaction/transaction.plain.entity";
import { UserPayload } from "src/business/entity/user/user.payload.entity";
import { TransactionQuery } from "src/business/query/transaction.query";
import { ITransactionRepository } from "src/data/repository/contract/transaction.repository";
import { JwtTokenGuard } from "src/security/token/passport/jwt.token.guard";
import { ILogger } from "src/util/logger/contract/logger";
import { IValidator } from "src/validation/contract/iValidator";

@Controller('transactions')
@UseGuards(JwtTokenGuard)
export class TransactionController {

    constructor(
        @Inject('ITransactionService') private readonly transactionRepository: ITransactionRepository,
        @Inject('ITransactionPlainValidator') private readonly transactionValidator: IValidator<TransactionPlain>,
        @Inject('ITransactionQueryValidator') private readonly transactrionQueryValidator: IValidator<TransactionQuery>,
        @Inject('ILogger') private readonly logger: ILogger,
    ) { }

    @Get()
    async getTransactions(@Request() request, @Query() query: TransactionQuery) {
        const validationResult = this.transactrionQueryValidator.validate(query);
        if (!validationResult.isValid) { throw new BadRequestException(validationResult.errors); }
        const user: UserPayload = request.user;
        return this.transactionRepository.get(user.id, query);
    }

    @Post()
    async createTransaction(@Request() request, @Body() transaction: TransactionPlain) {
        const validationResult = this.transactionValidator.validate(transaction);
        if (!validationResult.isValid) { throw new BadRequestException(validationResult.errors); }
        const user: UserPayload = request.user;
        return this.transactionRepository.create(transaction);
    }

    @Put(':id')
    async editTransaction(
        @Request() request,
        @Param('id') transactionId: number,
        @Body() transaction: TransactionPlain
    ) {
        const validationResult = this.transactionValidator.validate(transaction);
        if (!validationResult.isValid) { throw new BadRequestException(validationResult.errors); }
        const user: UserPayload = request.user;
        const haveRelation = await this.transactionRepository.haveRelation(user.id, transactionId);
        if (!haveRelation) { throw new ConflictException(); }
        return this.transactionRepository.edit(transactionId, transaction);
    }

    @HttpCode(204)
    @Delete(':id')
    async deleteTransation(@Request() request, @Param('id') transactionId: number) {
        const user: UserPayload = request.user;
        const haveRelation = await this.transactionRepository.haveRelation(user.id, transactionId);
        if (!haveRelation) { throw new ConflictException(); }
        return this.transactionRepository.delete(transactionId);
    }
}