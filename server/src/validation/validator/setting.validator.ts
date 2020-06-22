import { Setting } from "src/business/entity/setting/setting.entity";
import { BaseValidator } from "./base.validator";

export class SettingValidator extends BaseValidator<Setting> {

    protected handleValidation(data: Setting): void {
        const id = 'id';
        const currency = 'currency';
        this.id(id);
        if (this.existsAndNotNull(currency)) {
            this.maxLength(currency, 10);
            this.noWhitespaces(currency);
        }
    }
}