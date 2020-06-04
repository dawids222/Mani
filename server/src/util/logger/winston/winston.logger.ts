import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import { ILogger } from "../contract/logger";

@Injectable()
export class WinstonLogger implements ILogger {

    private readonly logger = winston.createLogger({
        format: winston.format.combine(
            winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
            winston.format.json(),
        ),
        transports: [
            new winston.transports.File({ filename: 'logs.log' }),
            new winston.transports.File({ filename: 'errors.log', level: 'error' }),
        ],
    });

    constructor() {
        if (process.env.NODE_ENV !== 'production') {
            this.logger.add(new winston.transports.Console({
                format: winston.format.simple(),
            }));
        }
    }

    public debug(message: string) {
        this.logger.debug(message);
    }

    public info(message: string) {
        this.logger.info(message)
    }

    public warn(message: string) {
        this.logger.warn(message)
    }

    public error(message: string) {
        this.logger.error(message)
    }
}