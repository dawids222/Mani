import { Inject } from "@nestjs/common";
import { Login } from "src/business/entity/user/login.entity";
import { Register } from "src/business/entity/user/register.entity";
import { User } from "src/business/entity/user/user.entity";
import { UserType } from "src/business/enum/user.type";
import { postgres } from "src/data/context/postgres.context";
import { IHasher } from "src/security/hasher/contract/hasher";
import { IUserRepository } from "../contract/user.repository";

export class UserRepository implements IUserRepository {
    constructor(@Inject('IHasher') private readonly hasher: IHasher) { }

    public login(data: Login): Promise<User> {
        return this
            .getUserByEmail(data.email)
            .then(user => {
                if (!user) { return null; }
                const match = this.hasher.compare(data.password, user.password);
                return match ? user : null;
            });
    }

    public register(data: Register): Promise<User> {
        const hash = this.hasher.hash(data.password);
        return postgres
            .query(`
                INSERT INTO users 
                VALUES (default, $1, $2, $3)
                RETURNING id, email, type;
            `, [data.email, hash, UserType.USER])
            .catch(x => null)
            .then((x) => x ? x.rows[0] : null);
    }

    private getUserByEmail(email: string): Promise<User> {
        return postgres
            .query(`
                SELECT id, email, password, type
                FROM users 
                WHERE email = $1;
            `, [email])
            .then(x => x.rowCount > 0 ? x.rows[0] : null);
    }
}