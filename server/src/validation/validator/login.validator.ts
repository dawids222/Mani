import { Login } from "src/business/entity/user/login.entity";
import { BaseValidator } from "./base.validator";

export class LoginValidator extends BaseValidator<Login> {

    protected handleValidation(data: Login) {
        const email = 'email';
        const password = 'password';
        if (this.existsAndNotNull(email)) {
            this.email(email);
        }
        if (this.existsAndNotNull(password)) {
            this.minLength(password, 4);
            this.maxLength(password, 20);
            this.noWhitespaces(password);
            this.noPasswordRestrictedCharacters(password);
        }
    }
}