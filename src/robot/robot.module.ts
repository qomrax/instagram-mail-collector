import { Module } from '@nestjs/common';
import { RobotService } from './robot.service';
import { EmailModule } from 'src/email/email.module';
import { ApiModule } from 'src/api/api.module';
import { EmailService } from 'src/email/email.service';
import { ApiService } from 'src/api/api.service';
import { AccountModule } from 'src/email/account/account.module';
import { AccountService } from 'src/email/account/account.service';

@Module({
  imports: [EmailModule, ApiModule, AccountModule,],
  providers: [RobotService, EmailService, ApiService, AccountService]
})
export class RobotModule { }
