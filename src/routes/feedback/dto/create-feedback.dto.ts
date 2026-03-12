import {
  IsString,
  IsEnum,
  IsOptional,
  IsArray,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FeedbackType, Rating } from '../entities/feedback.entity';

export class CandidateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  experience: string;
}

export class SkillsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: Rating })
  @IsEnum(Rating)
  rating: Rating;
}

export class ScreeningConceptsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  remarks?: string;
}

export class CreateFeedbackDto {
  @ApiProperty({ enum: FeedbackType })
  @IsEnum(FeedbackType)
  feedbackType: FeedbackType;

  @ApiProperty()
  @ValidateNested()
  @Type(() => CandidateDto)
  candidate: CandidateDto;

  @ApiProperty({ type: [SkillsDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SkillsDto)
  skills: SkillsDto[];

  @ApiProperty({ type: [ScreeningConceptsDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScreeningConceptsDto)
  screeningConcepts: ScreeningConceptsDto[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  finalRemarks: string;
}
