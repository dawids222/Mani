import { Module } from "@nestjs/common";
import { UserController } from "src/controller/user.controller";
import { UserRepository } from "src/data/repository/postgres/user.repository";
import { Bcrypt } from "src/security/hasher/bcrypt/bcrypt";

@Module({
    imports: [],
    controllers: [UserController],
    providers: [{
        provide: 'IUserRepository',
        useClass: UserRepository
    }, {
        provide: 'IHasher',
        useClass: Bcrypt,
    }],
})
export class UserModule { }