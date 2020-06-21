import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { Account } from "src/business/entity/account/account.entity";
import { UserPayload } from "src/business/entity/user/user.payload.entity";
import { IAccountRepository } from "src/data/repository/contract/account.repository";
import { JwtTokenGuard } from "src/security/token/passport/jwt.token.guard";
import { ILogger } from "src/util/logger/contract/logger";

@Controller('account')
@UseGuards(JwtTokenGuard)
export class AccountController {
    constructor(
        @Inject('IAccountRepository') private readonly accountRepository: IAccountRepository,
        @Inject('ILogger') private readonly logger: ILogger
    ) { }

    @Get()
    getAccounts(@Request() request) {
        const user: UserPayload = request.user;
        return this.accountRepository.getByUserId(user.id);
    }

    @Post()
    createAccount(@Request() request, @Body() account: Account) {
        const user: UserPayload = request.user;
        return this.accountRepository.create(account, user.id);
    }

    @Put()
    editAccount(@Request() request, @Body() account: Account) {
        const user: UserPayload = request.user;
        return this.accountRepository.edit(account);
    }

    @Delete(':id')
    deleteAccount(@Request() request, @Param('id') id: number) {
        const user: UserPayload = request.user;
        return this.accountRepository.delete(id);
    }
}