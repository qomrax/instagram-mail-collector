// src/logging/logger.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createLogger, format, transports, Logger as WinstonLogger } from 'winston';
import { LogEntity } from './log.entity';
import { CorrelationService } from './correlation/correlation.service';

@Injectable()
export class LogService {
    private logger: WinstonLogger;

    constructor(
        @InjectRepository(LogEntity)
        private logRepository: Repository<LogEntity>,
        private correlationService: CorrelationService,
    ) {
        this.logger = createLogger({
            format: format.combine(
                format.timestamp(),
                format.json(),
            ),
            transports: [
                new transports.Console(),
            ],
        });
    }

    async logMethodEntry(serviceName: string, methodName: string, args: any): Promise<void> {
        const correlationId = this.correlationService.getCorrelationId();

        const log = new LogEntity();
        log.correlationId = correlationId;
        log.level = 'info';
        log.serviceName = serviceName;
        log.methodName = methodName;
        log.request = JSON.stringify(args);

        await this.logRepository.save(log);

        this.logger.info(`[${correlationId}] ${serviceName}.${methodName} called with: ${JSON.stringify(args)}`);
    }

    async logMethodExit(serviceName: string, methodName: string, result: any): Promise<void> {
        const correlationId = this.correlationService.getCorrelationId();

        const log = new LogEntity();
        log.correlationId = correlationId;
        log.level = 'info';
        log.serviceName = serviceName;
        log.methodName = methodName;
        log.response = JSON.stringify(result);

        await this.logRepository.save(log);

        this.logger.info(`[${correlationId}] ${serviceName}.${methodName} returned: ${JSON.stringify(result)}`);
    }

    async logError(serviceName: string, methodName: string, args: any, error: Error): Promise<void> {
        const correlationId = this.correlationService.getCorrelationId();

        const log = new LogEntity();
        log.correlationId = correlationId;
        log.level = 'error';
        log.serviceName = serviceName;
        log.methodName = methodName;
        log.request = JSON.stringify(args);
        log.error = JSON.stringify({
            message: error.message,
            stack: error.stack,
        });

        await this.logRepository.save(log);

        this.logger.error(`[${correlationId}] ${serviceName}.${methodName} error: ${error.message}`, {
            args,
            stack: error.stack,
        });
    }
}
