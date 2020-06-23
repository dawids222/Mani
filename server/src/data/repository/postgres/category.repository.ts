import { Category } from "src/business/entity/category/category.entity";
import { postgres } from "src/data/context/postgres.context";
import { ICategoryRepository } from "../contract/category.repository";

export class CategoryRepository implements ICategoryRepository {

    private readonly table = 'categories';

    public async create(category: Category, userId: number): Promise<Category> {
        return postgres
            .query(`
                INSERT INTO ${this.table} 
                VALUES (default, $1, $2, $3, $4)
                RETURNING id, name, logo, color;
            `, [category.name, category.logo, category.color, userId])
            .then(x => x.rows[0]);
    }

    public async edit(category: Category): Promise<Category> {
        return postgres
            .query(`
                UPDATE ${this.table} SET
                name = $1,
                logo = $2,
                color = $3
                WHERE id = $4
                RETURNING id, name, logo, color;
            `, [category.name, category.logo, category.color, category.id])
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
                SELECT id, name, logo, color
                FROM ${this.table}
                WHERE user_id = $1;
            `, [userId])
            .then(x => x.rows);
    }

    public async getByCategoryId(categoryId: number): Promise<Category> {
        return postgres
            .query(`
                SELECT id, name, logo, color
                FROM ${this.table}
                WHERE id = $1;
            `, [categoryId])
            .then(x => x.rows[0]);
    }
}