import { Body, Controller, Inject, Post } from "@nestjs/common";
import { Login } from "src/business/entity/user/login.entity";
import { Register } from "src/business/entity/user/register.entity";
import { IUserRepository } from "src/data/repository/contract/user.repository";

@Controller('user')
export class UserController {
    constructor(@Inject('IUserRepository') private readonly userRepository: IUserRepository) { }

    @Post('login')
    async login(@Body() body: Login) {
        const user = await this.userRepository.login(body);
        if (!user) { return 500; }
        return 200; // + JWT TOKEN
    }

    @Post('register')
    async register(@Body() body: Register) {
        const user = this.userRepository.register(body);
        return user;
    }
}