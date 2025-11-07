import { Module } from '@nestjs/common';
import { HodimService } from './hodim.service';
import { HodimController } from './hodim.controller';

@Module({
  controllers: [HodimController],
  providers: [HodimService],
})
export class HodimModule {}
