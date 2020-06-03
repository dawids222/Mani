import { UserType } from "src/business/enum/user.type";

export class User {
    constructor(
        public id: number,
        public email: string,
        public password: string,
        public type: UserType,
    ) { }
}