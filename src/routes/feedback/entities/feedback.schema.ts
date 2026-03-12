import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { FeedbackType, Rating } from '../entities/feedback.entity';

export class Candidate extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  experience: string;
}

export const CandidateSchema = SchemaFactory.createForClass(Candidate);

export class Skills extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: Rating })
  rating: Rating;
}

export const SkillsSchema = SchemaFactory.createForClass(Skills);

export class ScreeningConcepts extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  remarks: string;
}

export const ScreeningConceptsSchema =
  SchemaFactory.createForClass(ScreeningConcepts);

@Schema({ timestamps: true })
export class Feedback extends Document {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Candidate' })
  candidateId: Types.ObjectId;

  @Prop({ required: true, enum: FeedbackType })
  feedbackType: FeedbackType;

  @Prop({ required: true, type: [SkillsSchema] })
  skills: Types.Array<Skills>;

  @Prop({ required: true, type: [ScreeningConceptsSchema] })
  screeningConcepts: Types.Array<ScreeningConcepts>;

  @Prop({ required: true })
  finalRemarks: string;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
