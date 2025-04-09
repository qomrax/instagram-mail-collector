import { Global, Module } from '@nestjs/common';
import { UserController } from 'src/user/user.controller';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { SettingModule } from './setting/setting.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserInterceptor } from './user.interceptor';
@Global()
@Module({
  controllers: [UserController],
  providers: [UserService, { provide: APP_INTERCEPTOR, useClass: UserInterceptor }],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    SettingModule,
  ],
  exports: [TypeOrmModule, UserService]
})
export class UserModule { }
