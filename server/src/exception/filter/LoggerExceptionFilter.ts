import { ArgumentsHost, HttpException, HttpServer } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { ILogger } from "src/util/logger/contract/logger";

export class LoggerExceptionFilter extends BaseExceptionFilter {

    constructor(
        httpServer: HttpServer,
        private readonly logger: ILogger,
    ) {
        super(httpServer)
    }

    public catch(exception: HttpException, host: ArgumentsHost) {
        const message = exception.stack ?? exception.message;
        this.logger.error(message);
        super.catch(exception, host);
    }
}