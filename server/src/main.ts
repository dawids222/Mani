import { NestFactory } from '@nestjs/core';
import { initialize } from './data/context/postgres.context';
require('dotenv').config();
const { AppModule } = require('./module/app.module');

async function bootstrap() {
  await initialize();
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
