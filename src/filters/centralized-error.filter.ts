import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Catch()
export class CentralizedErrorFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : (exception as Error)?.message || 'Internal server error';

    console.error(
      `HTTP ${status} - ${request?.method} ${request?.url}`,
      exception instanceof Error ? exception.stack : exception,
    );

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request?.url || 'unknown',
      method: request?.method || 'unknown',
      message,
    };

    response.status(status).send(errorResponse);
  }
}
