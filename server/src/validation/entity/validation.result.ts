export class ValidationResult {
    constructor(
        public readonly errors: string[] = [],
    ) { }

    public get isValid(): boolean {
        return this.errors.length === 0;
    }
}