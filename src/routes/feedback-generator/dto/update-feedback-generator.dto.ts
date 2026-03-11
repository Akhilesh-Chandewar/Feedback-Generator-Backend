import { PartialType } from '@nestjs/swagger';
import { CreateFeedbackGeneratorDto } from './create-feedback-generator.dto';

export class UpdateFeedbackGeneratorDto extends PartialType(CreateFeedbackGeneratorDto) {}
