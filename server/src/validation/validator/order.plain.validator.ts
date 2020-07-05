import { OrderPlain } from "src/business/entity/order/order.plain";
import { BaseValidator } from "./base.validator";

export class OrderPlainValidator extends BaseValidator<OrderPlain> {

    protected handleValidation(data: OrderPlain): void {
        const name = 'name';
        const type = 'type';
        const value = 'value';
        const isActive = 'isActive';
        const triggerDays = 'triggerDays';
        const triggerMonths = 'triggerMonths';
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
        if (this.existsAndNotNull(isActive)) {
            this.boolean(isActive);
        }
        if (this.existsAndNotNull(triggerDays)) {
            this.array(triggerDays);
        }
        if (this.existsAndNotNull(triggerMonths)) {
            this.array(triggerMonths);
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