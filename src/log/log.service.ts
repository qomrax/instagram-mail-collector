import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createLogger, format, transports, Logger as WinstonLogger } from 'winston';
import { LogEntity } from './log.entity';
import { CorrelationService } from './correlation/correlation.service';
import * as CircularJSON from "circular-json"
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
                new transports.Console({
                    silent: true
                }),
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
        log.request = CircularJSON.stringify(args);

        await this.logRepository.save(log);

        this.logger.info(`[${correlationId}] ${serviceName}.${methodName} called with: ${CircularJSON.stringify(args)}`);
    }

    async logBackgroundJob(jobName: string, args: any = null): Promise<void> {
        const correlationId = this.correlationService.getCorrelationId();

        const log = new LogEntity();
        log.correlationId = correlationId;
        log.level = 'info';
        log.serviceName = 'BackgroundJob';
        log.methodName = jobName;
        log.request = args ? CircularJSON.stringify(args) : null;

        await this.logRepository.save(log);

        this.logger.info(`[${correlationId}] Background job ${jobName} started with args: ${CircularJSON.stringify(args)}`);
    }

    async logMethodExit(serviceName: string, methodName: string, result: any): Promise<void> {
        const correlationId = this.correlationService.getCorrelationId();

        const log = new LogEntity();
        log.correlationId = correlationId;
        log.level = 'info';
        log.serviceName = serviceName;
        log.methodName = methodName;
        log.response = CircularJSON.stringify(result);

        await this.logRepository.save(log);

        this.logger.info(`[${correlationId}] ${serviceName}.${methodName} returned: ${CircularJSON.stringify(result)}`);
    }

    async logError(serviceName: string, methodName: string, args: any, error: Error): Promise<void> {
        const correlationId = this.correlationService.getCorrelationId();

        const log = new LogEntity();
        log.correlationId = correlationId;
        log.level = 'error';
        log.serviceName = serviceName;
        log.methodName = methodName;
        log.request = CircularJSON.stringify(args);
        log.error = CircularJSON.stringify({
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
