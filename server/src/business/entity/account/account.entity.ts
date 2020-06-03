export class Account {
    constructor(
        public id: number,
        public name: string,
        public balance: number,
        public income: number | null,
        public updateDay: number | null,
    ) { }
}