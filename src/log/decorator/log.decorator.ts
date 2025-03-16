// src/logging/decorators/log-method.decorator.ts
import { LogService } from '../log.service';

export function LogMethod() {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor,
    ) {
        const originalMethod = descriptor.value;
        const className = target.constructor.name;

        descriptor.value = async function (...args: any[]) {

            const logService = this.logService as LogService;

            if (!logService) {
                console.error('LoggerService not available in the class using LogMethod decorator');
                return originalMethod.apply(this, args);
            }

            try {
                // Log method entry
                await logService.logMethodEntry(className, propertyKey, args);

                // Execute original method
                const result = await originalMethod.apply(this, args);

                // Log method exit
                await logService.logMethodExit(className, propertyKey, result);

                return result;
            } catch (error) {
                // Log error
                await logService.logError(className, propertyKey, args, error);
                throw error;
            }
        };

        return descriptor;
    };
}
