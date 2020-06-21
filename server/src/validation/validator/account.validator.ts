import { Account } from "src/business/entity/account/account.entity";
import { BaseValidator } from "./base.validator";

export class AccountValidator extends BaseValidator<Account> {

    protected handleValidation(data: Account): void {
        const name = 'name';
        const income = 'income';
        const updateDay = 'updateDay';
        if (this.existsAndNotNull(name)) {
            this.notEmpty(name);
        }
        if (this.existsAndNotNull(income) &&
            this.notNull(updateDay, false)) {
            this.notEmpty(income);
            this.number(income);
            this.greaterOrEqual(income, 0);
        }
        if (this.exists(updateDay) &&
            this.notNull(updateDay, false)) {
            this.number(updateDay);
            this.greaterOrEqual(updateDay, 1);
            this.smallerOrEqual(updateDay, 28);
        }
    }
}