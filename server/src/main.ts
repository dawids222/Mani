import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { initialize } from './data/context/postgres.context';

async function bootstrap() {
  dotenv.config();
  await initialize();
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
