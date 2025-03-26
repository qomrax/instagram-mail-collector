import { Module, Global, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogEntity } from './log.entity';
import { LogService } from './log.service';
import { CorrelationService } from './correlation/correlation.service';
import { CorrelationMiddleware } from './correlation/middleware/correlation.middleware';
import { CorrelationModule } from './correlation/correlation.module';
import { JobService } from './job/job.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([LogEntity]), CorrelationModule],
  providers: [LogService, CorrelationService, JobService],
  exports: [LogService, CorrelationService, JobService],
})
export class LogModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationMiddleware).forRoutes('*');
  }
}