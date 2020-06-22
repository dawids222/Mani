import { Register } from "src/business/entity/user/register.entity";
import { BaseValidator } from "./base.validator";

export class RegisterValidator extends BaseValidator<Register> {

    protected handleValidation(data: Register): void {
        const email = 'email';
        const password = 'password';
        const verifyPassword = 'verifyPassword';
        if (this.existsAndNotNull(email)) {
            this.email(email);
        }
        if (this.existsAndNotNull(password)) {
            this.password(password);
        }
        if (this.existsAndNotNull(verifyPassword)) {
            this.match(verifyPassword, password);
        }
    }
}