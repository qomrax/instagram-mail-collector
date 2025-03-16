import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { v4 as uuidv4 } from 'uuid';

export const asyncLocalStorage = new AsyncLocalStorage<Map<string, any>>();

@Injectable()
export class CorrelationService {
    private readonly asyncStorage = asyncLocalStorage;

    generateCorrelationId(): string {
        return uuidv4();
    }

    getCorrelationId(): string {
        const store = this.asyncStorage.getStore();
        return store?.get('correlationId') || 'unknown';
    }

    setCorrelationId(correlationId: string): void {
        const store = this.asyncStorage.getStore();
        if (store) {
            store.set('correlationId', correlationId);
        }
    }
}