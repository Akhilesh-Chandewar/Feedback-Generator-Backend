import mongoose, { Schema, Document } from 'mongoose';
import {
  FeedbackType,
  Rating,
  IFeedback,
  ICandidate,
  ISkills,
  IScreeningConcepts,
} from '../entities/feedback.entity';

export type FeedbackDocument = Document & IFeedback;

const CandidateSchema = new Schema<ICandidate>(
  {
    name: { type: String, required: true },
    experience: { type: String, required: true },
  },
  { _id: false },
);

const SkillsSchema = new Schema<ISkills>(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true, enum: Object.values(Rating) },
  },
  { _id: false },
);

const ScreeningConceptsSchema = new Schema<IScreeningConcepts>(
  {
    name: { type: String, required: true },
    remarks: { type: String, default: '' },
  },
  { _id: false },
);

const FeedbackSchema = new Schema<FeedbackDocument>(
  {
    candidate: {
      type: Schema.Types.ObjectId,
      ref: 'Candidate',
      required: true,
    },
    feedbackType: {
      type: String,
      required: true,
      enum: Object.values(FeedbackType),
    },
    skills: { type: [SkillsSchema], default: [] },
    screeningConcepts: { type: [ScreeningConceptsSchema], default: [] },
    finalRemarks: { type: String, default: '' },
  },
  {
    timestamps: true,
  },
);

export const FeedbackModel = mongoose.model<FeedbackDocument>(
  'Feedback',
  FeedbackSchema,
);
