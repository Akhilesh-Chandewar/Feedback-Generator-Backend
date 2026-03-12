import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { DatabaseService } from 'src/database/database.service';
import { throwError } from 'src/helper/throw-error';
import mongoose from 'mongoose';
import {
  Feedback,
  Candidate,
  CandidateSchema,
  FeedbackSchema,
} from './entities/feedback.schema';
import { ApiResponse } from 'src/helper/api-response';
import { IScreeningConcepts, ISkills } from './entities/feedback.entity';

@Injectable()
export class FeedbackService {
  private candidateModel: mongoose.Model<Candidate>;
  private feedbackModel: mongoose.Model<Feedback>;

  constructor(private readonly databaseService: DatabaseService) {
    this.candidateModel = mongoose.model<Candidate>(
      'Candidate',
      CandidateSchema,
    );
    this.feedbackModel = mongoose.model<Feedback>('Feedback', FeedbackSchema);
  }

  async create(createFeedbackDto: CreateFeedbackDto) {
    try {
      const {
        feedbackType,
        candidate,
        skills,
        screeningConcepts,
        finalRemarks,
      } = createFeedbackDto;

      const candidateDoc = new this.candidateModel({
        name: candidate.name,
        experience: candidate.experience,
      });

      const savedCandidate = await candidateDoc.save();

      if (!savedCandidate || !savedCandidate._id) {
        throwError('Failed to insert candidate data', HttpStatus.BAD_REQUEST);
      }

      const candidateId = savedCandidate._id;

      const feedbackDoc = new this.feedbackModel({
        candidateId: candidateId,
        feedbackType: feedbackType,
        skills: skills,
        screeningConcepts: screeningConcepts,
        finalRemarks: finalRemarks,
      });
      const savedFeedback = await feedbackDoc.save();

      if (!savedFeedback || !savedFeedback._id) {
        throwError('Failed to insert feedback data', HttpStatus.BAD_REQUEST);
      }

      return new ApiResponse(
        HttpStatus.CREATED,
        'Feedback created successfully',
        {
          feedbackId: savedFeedback._id,
          candidateId: savedCandidate._id,
        },
      );
    } catch (error) {
      console.error('Error creating feedback:', error);
      throwError(
        error.message || 'Failed to create feedback',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
