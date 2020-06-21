import { Module } from "@nestjs/common";
import { AccountController } from "src/controller/account.controller";
import { AccountRepository } from "src/data/repository/postgres/account.repository";
import { AccountValidator } from "src/validation/validator/account.validator";
import { IdAccountValidator } from "src/validation/validator/id.account.validator";
import { BaseModule } from "./base.module";

@Module({
    imports: [BaseModule],
    controllers: [AccountController],
    providers: [{
        provide: 'IAccountRepository',
        useClass: AccountRepository,
    }, {
        provide: 'IAccountValidator',
        useClass: AccountValidator,
    }, {
        provide: 'IIdAccountValidator',
        useClass: IdAccountValidator,
    }],
})
export class AccountModule { }