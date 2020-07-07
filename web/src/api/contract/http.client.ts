import { Login } from '../entity/auth/login.entity';
import { Token } from '../entity/auth/token.entity';

export interface IHttpClient {
    login(data: Login): Promise<Token>;
}