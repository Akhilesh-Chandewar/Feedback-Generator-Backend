import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  use(req: FastifyRequest, res: FastifyReply, next: () => void): void {
    const { method, url, ip } = req;
    const userAgent = req.headers['user-agent'] || '';
    const startTime = Date.now();

    res.raw.on('finish', () => {
      const duration = Date.now() - startTime;
      const { statusCode } = res.raw;

      (req.log as { info: (msg: string) => void }).info(
        `${method} ${url} ${statusCode} ${duration}ms - ${ip} ${userAgent}`,
      );
    });

    next();
  }
}
