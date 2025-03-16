import { Module } from '@nestjs/common';
import { ConstantService } from './constant.service';

@Module({
  providers: [ConstantService]
})
export class ConstantModule {}
