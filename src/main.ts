import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import { HttpLoggerMiddleware } from './middleware/http-logger.middleware';
import { CentralizedErrorFilter } from './filters/centralized-error.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);
  app.useGlobalFilters(new CentralizedErrorFilter());
  app.use(new HttpLoggerMiddleware().use.bind(new HttpLoggerMiddleware()));

  const config = new DocumentBuilder()
    .setTitle('Feedback Generator API')
    .setDescription('The feedback generator API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
  logger.log(`Application is running on: ${await app.getUrl()}`, 'Bootstrap');
}
bootstrap();
