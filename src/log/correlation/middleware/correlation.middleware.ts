import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CorrelationService, asyncLocalStorage } from '../correlation.service';

@Injectable()
export class CorrelationMiddleware implements NestMiddleware {
    constructor(private correlationService: CorrelationService) { }

    use(req: Request, res: Response, next: NextFunction) {
        const correlationId =
            req.headers['x-correlation-id'] as string ||
            this.correlationService.generateCorrelationId();

        res.setHeader('x-correlation-id', correlationId);

        const store = new Map<string, any>();
        store.set('correlationId', correlationId);

        asyncLocalStorage.run(store, () => {
            next();
        });
    }
}
