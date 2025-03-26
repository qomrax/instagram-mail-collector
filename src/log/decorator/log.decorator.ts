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
                await logService.logMethodEntry(className, propertyKey, args);

                const result = await originalMethod.apply(this, args);

                await logService.logMethodExit(className, propertyKey, result);

                return result;
            } catch (error) {
                await logService.logError(className, propertyKey, args, error);
                throw error;
            }
        };

        return descriptor;
    };
}
