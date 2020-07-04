import { Category } from "src/business/entity/category/category.entity";
import { BaseEntityAdapter } from "../contract/base.entity.adapter";

export class CategoryAdapter extends BaseEntityAdapter<Category> {

    public adapt(value: any): Category {
        const id = Number(value.id);
        const name = value.name;
        const logo = value.logo;
        const color = value.color;
        const subcategories = value.subcategories ?
            value.subcategories.map((x: any) => this.adapt(x)) :
            [];
        return new Category(
            id,
            name,
            logo,
            color,
            subcategories,
        );
    }
}