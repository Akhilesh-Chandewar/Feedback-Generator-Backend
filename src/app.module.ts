import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { winstonLoggerOptions } from './helper/winston-logger.options';

@Module({
  imports: [WinstonModule.forRoot(winstonLoggerOptions)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
