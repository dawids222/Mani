import { Module } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { JwtTokenStrategy } from '../security/token/passport/jwt.token.strategy';
import { AppService } from '../service/app.service';
import { AccountModule } from './account.module';
import { CategoryModule } from './category.module';
import { SettingModule } from './setting.module';
import { TransactionModule } from './transaction.module';
import { UserModule } from './user.module';

@Module({
  imports: [
    AccountModule,
    UserModule,
    SettingModule,
    CategoryModule,
    TransactionModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
    JwtTokenStrategy,
  ],
})
export class AppModule { }
