import { Category } from "src/business/entity/category/category.entity";
import { CategoryPlain } from "src/business/entity/category/category.plain.entity";

export interface ICategoryRepository {
    create(category: CategoryPlain, userId: number): Promise<CategoryPlain>;
    edit(categoryId: number, category: CategoryPlain): Promise<CategoryPlain>;
    delete(categoryId: number): Promise<void>;
    getByUserId(userId: number): Promise<Category[]>;
    getByCategoryId(categoryId: number): Promise<Category>;
    getByCategoryIds(categoryIds: number[]): Promise<Category[]>;
    haveRelation(userId: number, categoryId: number): Promise<boolean>;
}