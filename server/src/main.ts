import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { initialize } from './data/context/postgres.context';
import { LoggerExceptionFilter } from './exception/filter/LoggerExceptionFilter';
require('dotenv').config();
const { AppModule } = require('./module/app.module');

async function bootstrap() {
  await initialize();
  const app = await NestFactory.create(AppModule);

  const logger = app.get('ILogger');
  const { httpAdapter } = app.get(HttpAdapterHost);
  const exceptionFilter = new LoggerExceptionFilter(httpAdapter, logger);
  app.useGlobalFilters(exceptionFilter);

  await app.listen(3000);
}
bootstrap();
