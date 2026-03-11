import {
  Injectable,
  NestMiddleware,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  use(req: FastifyRequest, res: FastifyReply, next: () => void): void {
    const { method, url, ip } = req;
    const userAgent = req.headers['user-agent'] || '';
    const startTime = Date.now();

    const originalSend = res.send;
    res.send = function (data: unknown): FastifyReply {
      const duration = Date.now() - startTime;
      const statusCode = res.statusCode;

      (req.log as { info: (msg: string) => void }).info(
        `${method} ${url} ${statusCode} ${duration}ms - ${ip} ${userAgent}`,
      );

      return originalSend.call(this, data);
    };

    next();
  }
}
