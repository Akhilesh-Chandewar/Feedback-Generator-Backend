import { Injectable } from '@nestjs/common';
import { CreateFeedbackGeneratorDto } from './dto/create-feedback-generator.dto';
import { UpdateFeedbackGeneratorDto } from './dto/update-feedback-generator.dto';

@Injectable()
export class FeedbackGeneratorService {
  create(createFeedbackGeneratorDto: CreateFeedbackGeneratorDto) {
    return 'This action adds a new feedbackGenerator';
  }

  findAll() {
    return `This action returns all feedbackGenerator`;
  }

  findOne(id: number) {
    return `This action returns a #${id} feedbackGenerator`;
  }

  update(id: number, updateFeedbackGeneratorDto: UpdateFeedbackGeneratorDto) {
    return `This action updates a #${id} feedbackGenerator`;
  }

  remove(id: number) {
    return `This action removes a #${id} feedbackGenerator`;
  }
}
