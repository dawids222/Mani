import { Inject } from "@nestjs/common";
import { Category } from "src/business/entity/category/category.entity";
import { CategoryPlain } from "src/business/entity/category/category.plain.entity";
import { IEntityAdapter } from "src/data/adapter/contract/entity.adapter";
import { postgres } from "src/data/context/postgres.context";
import { ICategoryRepository } from "../contract/category.repository";

export class CategoryRepository implements ICategoryRepository {

    private readonly table = 'categories';

    constructor(
        @Inject("ICategoryAdapter") private readonly categoryAdapter: IEntityAdapter<Category>,
    ) { }

    public async create(category: CategoryPlain, userId: number): Promise<CategoryPlain> {
        return postgres
            .query(`
                INSERT INTO ${this.table} 
                VALUES (default, $1, $2, $3, $4, $5)
                RETURNING id, name, logo, color, category_id AS categoryId;
            `, [category.name, category.logo, category.color, userId, category.categoryId])
            .then(x => x.rows[0]);
    }

    public async edit(categoryId: number, category: CategoryPlain): Promise<CategoryPlain> {
        return postgres
            .query(`
                UPDATE ${this.table} SET
                name = $1,
                logo = $2,
                color = $3,
                category_id = $4
                WHERE id = $5
                RETURNING id, name, logo, color, category_id AS categoryId;
            `, [category.name, category.logo, category.color, category.categoryId, categoryId])
            .then(x => x.rows[0]);
    }

    public async delete(categoryId: number): Promise<void> {
        return postgres
            .query(`
                DELETE FROM ${this.table}
                WHERE id = $1;
            `, [categoryId])
            .then(x => { });
    }

    public async getByUserId(userId: number): Promise<Category[]> {
        return postgres
            .query(`
                SELECT id, name, logo, color, category_id
                FROM ${this.table}
                WHERE user_id = $1;
            `, [userId])
            .then(x => this.joinCategories(x.rows));
    }

    public async getByCategoryId(categoryId: number): Promise<Category> {
        return postgres
            .query(`
                SELECT id, name, logo, color, category_id
                FROM ${this.table}
                WHERE id = $1;
            `, [categoryId])
            .then(x => this.joinCategories(x.rows)[0]);
    }

    public async getByCategoryIds(categoryIds: number[]): Promise<Category[]> {
        if (!categoryIds.length) { return []; }
        return postgres
            .query(`
                SELECT id, name, logo, color, category_id
                FROM ${this.table}
                WHERE id IN (${categoryIds.join(', ')});
            `)
            .then(x => this.joinCategories(x.rows));
    }

    public async haveRelation(userId: number, categoryId: number): Promise<boolean> {
        return postgres
            .query(`
                SELECT id
                FROM ${this.table}
                WHERE 
                user_id = $1 AND
                id = $2
                LIMIT 1;
            `, [userId, categoryId])
            .then(x => x.rowCount > 0);
    }

    private joinCategories(categories: any[]): Category[] {
        categories.forEach(category => {
            category.subcategories = categories
                .filter(x => x.category_id === category.id);
        });
        // const masters = categories.filter(x => !x.category_id);
        return this.categoryAdapter.adaptMany(categories);
    }
}