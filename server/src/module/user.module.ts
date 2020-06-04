import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UserController } from "src/controller/user.controller";
import { UserRepository } from "src/data/repository/postgres/user.repository";
import { Bcrypt } from "src/security/hasher/bcrypt/bcrypt";
import { JwtTokenGenerator } from "src/security/token/passport/jwt.token.generator";

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET_KEY,
        }),
    ],
    controllers: [UserController],
    providers: [{
        provide: 'IUserRepository',
        useClass: UserRepository
    }, {
        provide: 'IHasher',
        useClass: Bcrypt,
    }, {
        provide: 'ITokenGenerator',
        useClass: JwtTokenGenerator,
    }],
})
export class UserModule { }