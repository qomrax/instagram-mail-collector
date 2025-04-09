import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionEntity } from './session.entity';
import { EmailEntity } from 'src/email/email.entity';
import { AccountEntity } from 'src/email/account/account.entity';
import { UserEntity } from 'src/user/user.entity';
import { EmailModule } from 'src/email/email.module';
import { AccountModule } from 'src/email/account/account.module';
import { EmailService } from 'src/email/email.service';
import { AccountService } from 'src/email/account/account.service';
@Module({
    imports: [UserModule, EmailModule, AccountModule, TypeOrmModule.forFeature([SessionEntity, EmailEntity, AccountEntity, UserEntity])],
    providers: [UserService, SessionService, EmailService, AccountService],
    controllers: [SessionController]
})
export class SessionModule {
    constructor() { }
}
