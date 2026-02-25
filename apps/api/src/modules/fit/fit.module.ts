import { Module } from '@nestjs/common';
import { FitController } from './fit.controller';
import { FitService } from './fit.service';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [AiModule],
  controllers: [FitController],
  providers: [FitService],
  exports: [FitService],
})
export class FitModule {}
