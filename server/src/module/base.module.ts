import { Module } from "@nestjs/common";
import { WinstonLogger } from "src/util/logger/winston/winston.logger";

const LoggerService = {
    provide: 'ILogger',
    useClass: WinstonLogger,
}

@Module({
    imports: [],
    providers: [LoggerService],
    exports: [LoggerService],
})
export class BaseModule { }