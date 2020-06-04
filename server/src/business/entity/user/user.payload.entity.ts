import { UserType } from "src/business/enum/user.type";
import { User } from "./user.entity";

export class UserPayload {

    public static fromUser(user: User) {
        return new UserPayload(
            user.id,
            user.email,
            user.type,
        );
    }

    constructor(
        public id: number,
        public email: string,
        public type: UserType,
    ) { }
}