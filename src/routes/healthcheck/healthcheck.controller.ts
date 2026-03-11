import { Controller, Get } from '@nestjs/common';
import { HealthcheckService } from './healthcheck.service';

@Controller('healthcheck')
export class HealthcheckController {
  constructor(private readonly healthcheckService: HealthcheckService) {}

  @Get()
  checkHealth() {
    return this.healthcheckService.checkHealth();
  }

  @Get('env')
  getEnvironment() {
    return this.healthcheckService.getEnvironment();
  }

  @Get('db')
  getDatabaseStatus() {
    return this.healthcheckService.getDatabaseStatus();
  }
}
