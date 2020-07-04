import { Module } from "@nestjs/common";
import { ArrayUtil } from "src/util/array/array.util";
import { WinstonLogger } from "src/util/logger/winston/winston.logger";

const LoggerService = {
    provide: 'ILogger',
    useClass: WinstonLogger,
}

const ArrayUtilProvider = {
    provide: 'IArrayUtil',
    useClass: ArrayUtil,
}

@Module({
    imports: [],
    providers: [
        LoggerService,
        ArrayUtilProvider,
    ],
    exports: [
        LoggerService,
        ArrayUtilProvider,
    ],
})
export class BaseModule { }