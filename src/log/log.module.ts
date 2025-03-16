import { Module, Global, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogEntity } from './log.entity';
import { LogService } from './log.service';
import { CorrelationService } from './correlation/correlation.service';
import { CorrelationMiddleware } from './correlation/middleware/correlation.middleware';
import { CorrelationModule } from './correlation/correlation.module';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([LogEntity]), CorrelationModule],
  providers: [LogService, CorrelationService],
  exports: [LogService, CorrelationService],
})
export class LogModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationMiddleware).forRoutes('*');
  }
}