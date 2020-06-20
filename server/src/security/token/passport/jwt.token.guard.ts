import { AuthGuard } from '@nestjs/passport';

export class JwtTokenGuard extends AuthGuard('jwt') { }
