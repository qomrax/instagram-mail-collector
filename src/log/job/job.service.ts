import { Injectable } from '@nestjs/common';
import { CorrelationService, asyncLocalStorage } from '../correlation/correlation.service';

@Injectable()
export class JobService {
    constructor(private correlationService: CorrelationService) { }

    async runWithNewCorrelation<T>(
        jobName: string,
        func: () => Promise<T> | T
    ): Promise<T> {
        const correlationId = this.correlationService.generateCorrelationId();

        const store = new Map<string, any>();
        store.set('correlationId', correlationId);
        store.set('jobName', jobName);

        return asyncLocalStorage.run(store, async () => {
            console.log(`[BACKGROUND JOB][${correlationId}] ${jobName} başlatıldı`);
            try {
                const result = await func();
                console.log(`[BACKGROUND JOB][${correlationId}] ${jobName} tamamlandı`);
                return result;
            } catch (error) {
                console.error(`[BACKGROUND JOB][${correlationId}] ${jobName} hatası:`, error.message);
                throw error;
            }
        });
    }
}
