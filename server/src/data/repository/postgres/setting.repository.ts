import { Setting } from "src/business/entity/setting/setting.entity";
import { postgres } from "src/data/context/postgres.context";
import { ISettingRepository } from "../contract/setting.repository";

export class SettingRepository implements ISettingRepository {

    private readonly table = 'settings';

    public async create(setting: Setting, userId: number): Promise<Setting> {
        return postgres
            .query(`
                INSERT INTO ${this.table}
                VALUES (default, $1, $2)
                RETURNING id, currency;
            `, [setting.currency, userId])
            .then(x => x.rows[0]);
    }

    public async edit(setting: Setting): Promise<Setting> {
        return postgres
            .query(`
                UPDATE ${this.table} SET 
                currency = $1
                WHERE id = $2
                RETURNING id, currency;
            `, [setting.currency, setting.id])
            .then(x => x.rows[0]);
    }

    public async get(userId: number): Promise<Setting> {
        return postgres
            .query(`
                SELECT id, currency
                FROM ${this.table}
                WHERE user_id = $1;
            `, [userId])
            .then(x => x.rowCount > 0 ? x.rows[0] : null);
    }
}