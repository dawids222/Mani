import { OrderQuery } from "src/business/query/order.query";
import { BaseValidator } from "./base.validator";

export class OrderQueryValidator extends BaseValidator<OrderQuery> {

    protected handleValidation(data: OrderQuery): void {
        const page = 'page';
        const itemsPerPage = 'itemsPerPage';
        const id = 'id';
        const categoryId = 'categoryId';
        const accountId = 'accountId';
        const targetAccountId = 'targetAccountId';
        if (this.existsAndNotNull(page)) {
            this.number(page);
            this.greaterOrEqual(page, 1);
        }
        if (this.existsAndNotNull(itemsPerPage)) {
            this.number(itemsPerPage);
            this.greaterOrEqual(itemsPerPage, 1);
        }
        if (this.exists(id, false)) {
            if (this.notNull(id, false)) {
                this.id(id);
            }
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