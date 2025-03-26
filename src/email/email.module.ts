import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { AccountModule } from './account/account.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailEntity } from './email.entity';
import { AccountService } from './account/account.service';
import { EmailController } from './email.controller';


@Module({
  providers: [EmailService, AccountService],
  imports: [AccountModule, TypeOrmModule.forFeature([EmailEntity])],
  exports: [TypeOrmModule],
  controllers: [EmailController]
})
export class EmailModule {
}
