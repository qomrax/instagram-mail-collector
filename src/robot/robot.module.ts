import { Module } from '@nestjs/common';
import { RobotService } from './robot.service';
import { EmailModule } from 'src/email/email.module';
import { ApiModule } from 'src/api/api.module';
import { EmailService } from 'src/email/email.service';
import { ApiService } from 'src/api/api.service';
import { AccountModule } from 'src/email/account/account.module';
import { AccountService } from 'src/email/account/account.service';
import { SessionModule } from './session/session.module';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { RobotController } from './robot.controller';
import { SessionService } from './session/session.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionEntity } from './session/session.entity';

@Module({
  imports: [EmailModule, ApiModule, AccountModule, SessionModule, UserModule, SessionModule, TypeOrmModule.forFeature([SessionEntity])],
  providers: [RobotService, EmailService, ApiService, AccountService, UserService, SessionService],
  controllers: [RobotController]
})
export class RobotModule { }
