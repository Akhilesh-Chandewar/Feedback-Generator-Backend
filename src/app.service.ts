import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  greet(): string {
    return `Welcome to Feedback Generator APIs!`;
  }
}
