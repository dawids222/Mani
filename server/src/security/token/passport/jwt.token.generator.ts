import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/business/entity/user/user.entity";
import { ITokenGenerator } from "../contract/token.generator";

@Injectable()
export class JwtTokenGenerator implements ITokenGenerator {

    constructor(
        private jwtService: JwtService,
    ) { }

    public generate(data: User): string {
        const payload = {
            id: data.id,
            email: data.email,
            type: data.type,
        };
        const token = this.jwtService.sign(payload);
        return `bearer ${token}`;
    }
}