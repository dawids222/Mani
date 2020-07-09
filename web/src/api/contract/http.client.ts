import { Login } from '../entity/auth/login.entity';
import { Register } from '../entity/auth/register.entity';
import { Token } from '../entity/auth/token.entity';
import { User } from '../entity/user/user.entity';

export interface IHttpClient {
    login(data: Login): Promise<Token>;
    register(data: Register): Promise<User>;
}