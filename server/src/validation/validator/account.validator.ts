import { Account } from "src/business/entity/account/account.entity";
import { BaseValidator } from "./base.validator";

export class AccountValidator extends BaseValidator<Account> {

    protected handleValidation(data: Account): void {
        const name = 'name';
        const description = 'description';
        if (this.existsAndNotNull(name)) {
            this.notEmpty(name);
        }
        if (this.existsAndNotNull(description)) {

        }
    }
}