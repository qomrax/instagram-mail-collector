import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvService } from 'src/env/env.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private envService: EnvService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: envService.envConfig.JWT_KEY,
        });
    }

    async validate(payload: any) {
        return { id: payload.sub, email: payload.email, isAdmin: payload.isAdmin };
    }
}