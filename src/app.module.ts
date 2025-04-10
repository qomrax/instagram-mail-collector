import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvService } from 'src/env/env.service';
import { EnvModule } from 'src/env/env.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './user/user.module';
import { SettingModule } from './setting/setting.module';
import { ConstantModule } from './constant/constant.module';
import { LogModule } from './log/log.module';
import { ConstantService } from './constant/constant.service';
import { ApiModule } from './api/api.module';
import { EmailModule } from './email/email.module';
import { RobotModule } from './robot/robot.module';
import { CommonModule } from './common/common.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (envService: EnvService) => ({
        type: 'mysql',
        host: envService.envConfig.DATABASE_HOST,
        port: envService.envConfig.DATABASE_PORT,
        username: envService.envConfig.DATABASE_USERNAME,
        password: envService.envConfig.DATABASE_PASSWORD,
        database: envService.envConfig.DATABASE_NAME,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: envService.isDevelopment,
        autoLoadEntities: true,
        migrationsTransactionMode: "each"
      }),
      inject: [EnvService]
    }),
    JwtModule.registerAsync({
      useFactory: (envService: EnvService) => ({
        secret: envService.envConfig.JWT_KEY,
        signOptions: { expiresIn: '1h' },
      }),
      inject: [EnvService]
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    EnvModule,
    AuthModule,
    UserModule,
    SettingModule,
    ConstantModule,
    LogModule,
    ApiModule,
    EmailModule,
    RobotModule,
    CommonModule,
  ],
  controllers: [],
  providers: [EnvService, ConstantService],
})
export class AppModule {
  constructor(private envService: EnvService) { }
}