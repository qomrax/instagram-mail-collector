import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { EnvService } from 'src/env/env.service';
import { ExtractJwt } from 'passport-jwt';



@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private envService: EnvService) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request>();
        const authHeader = ExtractJwt.fromAuthHeaderAsBearerToken();
        const adminKey = authHeader(request)
        if (!adminKey) return false;

        return adminKey === this.envService.envConfig.ADMIN_KEY;;
    }
}