import { Module } from '@nestjs/common';
import { HealthcheckService } from './healthcheck.service';
import { HealthcheckController } from './healthcheck.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [HealthcheckController],
  providers: [HealthcheckService],
})
export class HealthcheckModule {}
