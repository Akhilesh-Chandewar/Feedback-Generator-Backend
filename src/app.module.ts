import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { winstonLoggerOptions } from './logger/logger.service';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [WinstonModule.forRoot(winstonLoggerOptions), LoggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
