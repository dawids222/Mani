import { INestApplication } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { initialize } from './data/context/postgres.context';
import { LoggerExceptionFilter } from './exception/filter/LoggerExceptionFilter';
import { IScheduler } from "./scheduler/contract/scheduler";
require('dotenv').config();
const { AppModule } = require('./module/app.module');

async function bootstrap() {
  await initialize();
  const app = await NestFactory.create(AppModule);

  const logger = app.get('ILogger');
  const { httpAdapter } = app.get(HttpAdapterHost);
  const exceptionFilter = new LoggerExceptionFilter(httpAdapter, logger);
  app.useGlobalFilters(exceptionFilter);

  handleCors(app);

  const scheduler: IScheduler = app.get('IScheduler');
  scheduler.scheduleJobs();

  await app.listen(3000);
}
bootstrap();


function handleCors(app: INestApplication) {
  if (process.env.NODE_ENV !== 'production') {
    app.enableCors({
      origin: '*',
      methods: [
        'GET',
        'HEAD',
        'PUT',
        'PATCH',
        'POST',
        'DELETE'
      ],
      allowedHeaders:
        ['Origin',
          'X-Requested-With',
          'Content-Type',
          'Accept',
          'Authorization',
          'authorization',
          'X-Forwarded-for'
        ],
    });
  }
}