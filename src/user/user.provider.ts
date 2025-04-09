import { ModuleRef } from '@nestjs/core';
import { Inject } from '@nestjs/common';
export const UserResolverProvider = {
    provide: 'USER_RESOLVER',
    useFactory: (moduleRef: ModuleRef) => ({
        transform: async (params: { userId: number, getUser: (moduleRef: ModuleRef) => Promise<any> }) => {
            return params.getUser(moduleRef);
        }
    }),
    inject: [ModuleRef]
};


export function InjectUser() {
    return Inject('USER_RESOLVER');
}
