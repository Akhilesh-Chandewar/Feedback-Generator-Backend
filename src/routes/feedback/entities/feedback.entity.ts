import { Types } from 'mongoose';

export enum FeedbackType {
  INTERNAL = 'Internal',
  CLIENT = 'Client',
}

export enum Rating {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
}

export interface ICandidate {
  _id: Types.ObjectId;
  name: string;
  experience: string;
}

export interface ISkills {
  _id: Types.ObjectId;
  name: string;
  rating: Rating;
}

export interface IScreeningConcepts {
  _id: Types.ObjectId;
  name: string;
  remarks: string;
}

export interface IFeedback {
  _id: Types.ObjectId;
  candidate: Types.ObjectId;
  feedbackType: FeedbackType;
  skills: ISkills[];
  screeningConcepts: IScreeningConcepts[];
  finalRemarks: string;
  createdAt?: Date;
  updatedAt?: Date;
}
