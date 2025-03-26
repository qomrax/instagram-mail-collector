import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './account.entity';
import { AccountController } from './account.controller';

@Module({
  providers: [AccountService],
  imports: [TypeOrmModule.forFeature([AccountEntity])],
  exports: [TypeOrmModule],
  controllers: [AccountController]
})
export class AccountModule { }
