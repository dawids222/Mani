import { Controller, Get, Inject, Param } from "@nestjs/common";
import { IAccountRepository } from "src/data/repository/contract/account.repository";

@Controller('account')
export class AccountController {
    constructor(@Inject('IAccountRepository') private readonly accountRepository: IAccountRepository) { }

    @Get(':id')
    getAccountsByUserId(@Param() params) {
        const id = params.id;
        return this.accountRepository.getAccountsByUserId(id);
    }
}