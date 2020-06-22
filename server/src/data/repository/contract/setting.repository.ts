import { Setting } from "src/business/entity/setting/setting.entity";

export interface ISettingRepository {
    create(setting: Setting, userId: number): Promise<Setting>;
    edit(setting: Setting): Promise<Setting>;
    get(userId: number): Promise<Setting>;
}