import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { EnvService } from 'src/env/env.service';
import { LogMethod } from 'src/log/decorator/log.decorator';
import { LogService } from 'src/log/log.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
        private envService: EnvService,
        private logService: LogService
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(email);
        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    @LogMethod()
    async login(user: any) {
        const payload = { email: user.email, sub: user.id, isAdmin: user.isAdmin };
        return {
            access_token: this.jwtService.sign(payload, {
                secret: this.envService.envConfig.JWT_KEY
            }),
        };
    }
}