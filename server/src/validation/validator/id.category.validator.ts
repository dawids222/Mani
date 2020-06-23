import { Category } from "src/business/entity/category/category.entity";
import { CategoryValidator } from "./category.validator";

export class IdCategoryValidator extends CategoryValidator {

    protected handleValidation(data: Category) {
        const id = 'id';
        this.id(id);
        super.handleValidation(data);
    }
}