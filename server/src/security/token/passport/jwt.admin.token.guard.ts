import { ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { User } from "src/business/entity/user/user.entity";
import { UserType } from "src/business/enum/user.type";
import { JwtTokenGuard } from "./jwt.token.guard";

export class JwtAdminTokenGuard extends JwtTokenGuard {

    public canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        return Promise.resolve(super.canActivate(context))
            .then(result => {
                const request = context.switchToHttp().getRequest();
                const user: User = request.user;
                return user.type === UserType.ADMIN;
            });
    }
}