import { ValidationResult } from "../entity/validation.result";

export interface IValidator<T> {
    validate(data: T): ValidationResult;
}