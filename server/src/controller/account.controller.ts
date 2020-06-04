import { Controller, Get, Inject, Request, UseGuards } from "@nestjs/common";
import { UserPayload } from "src/business/entity/user/user.payload.entity";
import { IAccountRepository } from "src/data/repository/contract/account.repository";
import { JwtTokenGuard } from "src/security/token/passport/jwt.token.guard";
import { ILogger } from "src/util/logger/contract/logger";

@Controller('account')
export class AccountController {
    constructor(
        @Inject('IAccountRepository') private readonly accountRepository: IAccountRepository,
        @Inject('ILogger') private readonly logger: ILogger
    ) { }

    @UseGuards(JwtTokenGuard)
    @Get()
    getAccounts(@Request() request) {
        const user: UserPayload = request.user;
        return this.accountRepository.getAccountsByUserId(user.id);
    }
}