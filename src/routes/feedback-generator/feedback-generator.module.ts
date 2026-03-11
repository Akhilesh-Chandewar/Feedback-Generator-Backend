import { Module } from '@nestjs/common';
import { FeedbackGeneratorService } from './feedback-generator.service';
import { FeedbackGeneratorController } from './feedback-generator.controller';

@Module({
  controllers: [FeedbackGeneratorController],
  providers: [FeedbackGeneratorService],
})
export class FeedbackGeneratorModule {}
