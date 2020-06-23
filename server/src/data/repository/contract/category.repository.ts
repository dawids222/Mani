import { Category } from "src/business/entity/category/category.entity";

export interface ICategoryRepository {
    create(category: Category, userId: number): Promise<Category>;
    edit(category: Category): Promise<Category>;
    delete(categoryId: number): Promise<void>;
    getByUserId(userId: number): Promise<Category[]>;
    getByCategoryId(categoryId: number): Promise<Category>;
}