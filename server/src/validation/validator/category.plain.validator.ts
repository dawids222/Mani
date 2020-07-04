import { CategoryPlain } from "src/business/entity/category/category.plain.entity";
import { BaseValidator } from "./base.validator";

export class CategoryPlainValidator extends BaseValidator<CategoryPlain> {

    protected handleValidation(data: CategoryPlain): void {
        const name = 'name';
        const logo = 'logo';
        const color = 'color';
        const categoryId = 'categoryId';
        if (this.existsAndNotNull(name)) {
            this.minLength(name, 1);
            this.maxLength(name, 20);
        }
        if (this.existsAndNotNull(logo)) {
            // todo: what logo should be like?
        }
        if (this.existsAndNotNull(color)) {
            this.colorHex(color);
        }
        if (this.exists(categoryId)) {
            if (this.notNull(categoryId, false)) {
                this.number(categoryId);
            }
        }
    }
}