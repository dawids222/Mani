import * as v from 'validator';
import { IValidator } from "../contract/iValidator";
import { ValidationResult } from "../entity/validation.result";

export abstract class BaseValidator<T> implements IValidator<T> {

    private data: any;
    private errors: string[] = [];
    private validator = v.default;

    private passwordRestrictedCharacters = `;<>\\{}[]+=?&,:'"\`'`;

    public validate(data: T): ValidationResult {
        this.data = data;
        this.errors = [];
        this.handleValidation(data);
        return new ValidationResult(this.errors);
    }

    protected abstract handleValidation(data: T): void;

    protected email(prop: string): boolean {
        return this.test(prop, x => this.validator.isEmail(String(x)), 'has to be a correct email address');
    }

    protected exists(prop: string): boolean {
        return this.test(prop, x => x !== undefined, 'is missing');
    }

    protected notNull(prop: string, trigger: boolean = true): boolean {
        return this.test(prop, x => x !== null, trigger ? 'can not be null' : null);
    }

    protected existsAndNotNull(prop: string) {
        return (this.exists(prop) && this.notNull(prop));
    }

    protected number(prop: string): boolean {
        return this.test(prop, x => this.validator.isNumeric(String(x)), 'has to be a number');
    }

    protected notEmpty(prop: string): boolean {
        return this.test(prop, x => !this.validator.isEmpty(String(x)), 'can not be empty');
    }

    protected greaterOrEqual(prop: string, threshold: number): boolean {
        return this.test(prop, x => Number(x) >= threshold, `has to be greater or equal to ${threshold}`);
    }

    protected smallerOrEqual(prop: string, threshold: number): boolean {
        return this.test(prop, x => Number(x) <= threshold, `has to be smaller or equal to ${threshold}`);
    }

    protected id(prop: string): boolean {
        if (this.existsAndNotNull(prop)) {
            return (
                this.number(prop) &&
                this.greaterOrEqual(prop, 1)
            );
        }
        return false;
    }

    protected minLength(prop: string, length: number): boolean {
        return this.test(prop, x => x.length >= length, `has to have minimum ${length} characters`);
    }

    protected maxLength(prop: string, length: number): boolean {
        return this.test(prop, x => x.length <= length, `has to have maximum ${length} characters`);
    }

    protected noWhitespaces(prop: string): boolean {
        return this.test(prop, x => !(/\s/.test(x)), `can not have whitespaces`);
    }

    protected noPasswordRestrictedCharacters(prop: string): boolean {
        return this.test(prop, x => {
            for (var i = 0; i < x.length; i++) {
                const char = x.charAt(i);
                if (this.passwordRestrictedCharacters.includes(char)) {
                    return false;
                }
            }
            return true;
        }, `can not contain any of those symbols ${this.passwordRestrictedCharacters}`);
    }

    protected password(prop: string) {
        this.minLength(prop, 4);
        this.maxLength(prop, 20);
        this.noWhitespaces(prop);
        this.noPasswordRestrictedCharacters(prop);
    }

    protected match(prop: string, parent: string) {
        const value = this.data[parent];
        return this.test(prop, x => x === value, `does not match ${parent}`);
    }

    protected test(prop: string, res: (value: string) => boolean, error: string): boolean {
        const value = this.data[prop];
        const isValid = res(value);
        if (!isValid && error) { this.errors.push(`${prop} -> ${error}`) }
        return isValid;
    }
}