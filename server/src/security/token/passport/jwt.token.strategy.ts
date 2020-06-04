import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserPayload } from "src/business/entity/user/user.payload.entity";

@Injectable()
export class JwtTokenStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET_KEY,
        });
    }

    async validate(payload: any) {
        return new UserPayload(
            payload.id,
            payload.email,
            payload.type,
        );
    }
}