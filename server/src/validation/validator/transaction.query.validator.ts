import { TransactionQuery } from "src/business/query/transaction.query";
import { BaseValidator } from "./base.validator";

export class TransactionQueryValidator extends BaseValidator<TransactionQuery> {

    protected handleValidation(data: TransactionQuery): void {
        const from = 'from';
        const to = 'to';
        const page = 'page';
        const itemsPerPage = 'itemsPerPage';
        const categoryId = 'categoryId';
        const accountId = 'accountId';
        const targetAccountId = 'targetAccountId';
        if (this.existsAndNotNull(from)) {
            this.date(from);
        }
        if (this.existsAndNotNull(to)) {
            this.date(to);
        }
        if (this.existsAndNotNull(page)) {
            this.number(page);
            this.greaterOrEqual(page, 1);
        }
        if (this.existsAndNotNull(itemsPerPage)) {
            this.number(itemsPerPage);
            this.greaterOrEqual(itemsPerPage, 1);
        }
        if (this.exists(categoryId, false)) {
            if (this.notNull(categoryId, false)) {
                this.id(categoryId);
            }
        }
        if (this.exists(accountId, false)) {
            if (this.notNull(accountId, false)) {
                this.id(accountId);
            }
        }
        if (this.exists(targetAccountId, false)) {
            if (this.notNull(targetAccountId, false)) {
                this.id(targetAccountId);
            }
        }
    }
}