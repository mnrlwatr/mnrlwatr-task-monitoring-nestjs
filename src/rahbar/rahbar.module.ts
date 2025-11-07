import { Module } from '@nestjs/common';
import { RahbarService } from './rahbar.service';
import { RahbarController } from './rahbar.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [RahbarController],
  providers: [RahbarService],
})
export class RahbarModule {}
