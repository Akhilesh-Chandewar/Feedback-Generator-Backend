import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FeedbackGeneratorService } from './feedback-generator.service';
import { CreateFeedbackGeneratorDto } from './dto/create-feedback-generator.dto';
import { UpdateFeedbackGeneratorDto } from './dto/update-feedback-generator.dto';

@Controller('feedback-generator')
export class FeedbackGeneratorController {
  constructor(private readonly feedbackGeneratorService: FeedbackGeneratorService) {}

  @Post()
  create(@Body() createFeedbackGeneratorDto: CreateFeedbackGeneratorDto) {
    return this.feedbackGeneratorService.create(createFeedbackGeneratorDto);
  }

  @Get()
  findAll() {
    return this.feedbackGeneratorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedbackGeneratorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeedbackGeneratorDto: UpdateFeedbackGeneratorDto) {
    return this.feedbackGeneratorService.update(+id, updateFeedbackGeneratorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedbackGeneratorService.remove(+id);
  }
}
