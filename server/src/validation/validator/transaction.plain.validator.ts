import { TransactionPlain } from "src/business/entity/transaction/transaction.plain.entity";
import { BaseValidator } from "./base.validator";

export class TransactionPlainValidator extends BaseValidator<TransactionPlain> {

    protected handleValidation(data: TransactionPlain): void {
        const name = 'name';
        const type = 'type';
        const value = 'value';
        const date = 'date';
        const accountId = 'accountId';
        const accountTargetId = 'accountTargetId';
        const categoryId = 'categoryId';
        if (this.existsAndNotNull(name)) {
            this.notEmpty(name);
            this.maxLength(name, 50);
        }
        if (this.existsAndNotNull(type)) {
            this.transactionType(type);
        }
        if (this.existsAndNotNull(value)) {
            this.number(value);
        }
        if (this.existsAndNotNull(date)) {
            this.date(date);
        }
        if (this.exists(accountId)) {
            if (this.notNull(accountId, false)) {
                this.id(accountId);
            }
        }
        if (this.exists(accountTargetId)) {
            if (this.notNull(accountTargetId, false)) {
                this.id(accountTargetId);
            }
        }
        if (this.exists(categoryId)) {
            if (this.notNull(categoryId, false)) {
                this.id(categoryId);
            }
        }
    }
}