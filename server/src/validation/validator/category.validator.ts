import { Category } from "src/business/entity/category/category.entity";
import { BaseValidator } from "./base.validator";

export class CategoryValidator extends BaseValidator<Category> {

    protected handleValidation(data: Category): void {
        const name = 'name';
        const logo = 'logo';
        const color = 'color';
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
    }
}