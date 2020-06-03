import { Login } from "src/business/entity/user/login.entity";
import { Register } from "src/business/entity/user/register.entity";
import { User } from "src/business/entity/user/user.entity";

export interface IUserRepository {
    login(data: Login): Promise<User>;
    register(data: Register): Promise<User>;
}