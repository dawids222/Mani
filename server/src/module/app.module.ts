import { Module } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { JwtTokenStrategy } from '../security/token/passport/jwt.token.strategy';
import { AppService } from '../service/app.service';
import { AccountModule } from './account.module';
import { SettingModule } from './setting.module';
import { UserModule } from './user.module';

@Module({
  imports: [
    AccountModule,
    UserModule,
    SettingModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtTokenStrategy,
  ],
})
export class AppModule { }
