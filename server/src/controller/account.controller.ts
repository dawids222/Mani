import { BadRequestException, Body, ConflictException, Controller, Delete, Get, HttpCode, Inject, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { Account } from "src/business/entity/account/account.entity";
import { UserPayload } from "src/business/entity/user/user.payload.entity";
import { IAccountRepository } from "src/data/repository/contract/account.repository";
import { JwtTokenGuard } from "src/security/token/passport/jwt.token.guard";
import { ILogger } from "src/util/logger/contract/logger";
import { IValidator } from "src/validation/contract/iValidator";

@Controller('account')
@UseGuards(JwtTokenGuard)
export class AccountController {
    constructor(
        @Inject('IAccountRepository') private readonly accountRepository: IAccountRepository,
        @Inject('IAccountValidator') private readonly accountValidator: IValidator<Account>,
        @Inject('IIdAccountValidator') private readonly idAccountValidator: IValidator<Account>,
        @Inject('ILogger') private readonly logger: ILogger
    ) { }

    @Get()
    async getAccounts(@Request() request) {
        const user: UserPayload = request.user;
        return this.accountRepository.getByUserId(user.id);
    }

    @Post()
    async createAccount(@Request() request, @Body() account: Account) {
        const validationResult = this.accountValidator.validate(account);
        if (!validationResult.isValid) { throw new BadRequestException(validationResult.errors); }
        const user: UserPayload = request.user;
        return this.accountRepository.create(account, user.id);
    }

    @Put()
    async editAccount(@Request() request, @Body() account: Account) {
        const validationResult = this.idAccountValidator.validate(account);
        if (!validationResult.isValid) { throw new BadRequestException(validationResult.errors); }
        const user: UserPayload = request.user;
        const haveRalation = await this.haveRelation(user.id, account.id);
        if (!haveRalation) { throw new ConflictException(); }
        return this.accountRepository.edit(account);
    }

    @HttpCode(204)
    @Delete(':id')
    async deleteAccount(@Request() request, @Param('id') accountId: number) {
        const user: UserPayload = request.user;
        const haveRaltion = await this.haveRelation(user.id, accountId);
        if (!haveRaltion) { throw new ConflictException(); }
        this.accountRepository.delete(accountId);
    }

    private async haveRelation(userId: number, accountId: number): Promise<boolean> {
        const accounts = await this.accountRepository.getByUserId(userId);
        return accounts.some(account => account.id == accountId);
    }
}