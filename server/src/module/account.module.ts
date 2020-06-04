import { Module } from "@nestjs/common";
import { AccountController } from "src/controller/account.controller";
import { AccountRepository } from "src/data/repository/postgres/account.repository";
import { BaseModule } from "./base.module";

@Module({
    imports: [BaseModule],
    controllers: [AccountController],
    providers: [{
        provide: 'IAccountRepository',
        useClass: AccountRepository,
    }],
})
export class AccountModule { }