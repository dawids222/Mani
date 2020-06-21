import { Account } from "src/business/entity/account/account.entity";
import { AccountValidator } from "./account.validator";

export class IdAccountValidator extends AccountValidator {

    protected handleValidation(data: Account): void {
        const id = 'id';
        this.id(id);
        super.handleValidation(data);
    }
}