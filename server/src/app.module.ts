import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './module/account.module';
import { UserModule } from './module/user.module';

@Module({
  imports: [AccountModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
