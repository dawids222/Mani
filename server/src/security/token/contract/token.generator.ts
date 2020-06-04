import { User } from "src/business/entity/user/user.entity";

export interface ITokenGenerator {
    generate(payload: User): string;
}