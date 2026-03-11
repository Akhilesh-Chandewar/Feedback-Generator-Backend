import { HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ApiResponse } from 'src/helper/api-response';

@Injectable()
export class HealthcheckService {
  constructor(private readonly databaseService: DatabaseService) {}

  checkHealth() {
    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const message = `Server instance is healthy with process id ${process.pid} on ${formattedDate}`;
    return new ApiResponse(HttpStatus.OK, message);
  }

  getEnvironment() {
    return new ApiResponse(HttpStatus.OK, 'Environment details', {
      environment: process.env.NODE_ENV,
      appName: process.env.APP_NAME,
    });
  }

  getDatabaseStatus() {
    const dbStatus = this.databaseService.getConnectionStatus();
    return new ApiResponse(HttpStatus.OK, 'Database status', dbStatus);
  }
}
