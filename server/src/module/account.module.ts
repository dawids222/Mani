import { Module } from "@nestjs/common";
import { AccountController } from "src/controller/account.controller";
import { AccountRepository } from "src/data/repository/postgres/account.repository";

@Module({
    imports: [],
    controllers: [AccountController],
    providers: [{
        provide: 'IAccountRepository',
        useClass: AccountRepository,
    }],
})
export class AccountModule { }