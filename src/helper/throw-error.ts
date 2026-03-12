import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorMessage {
  static readonly BAD_REQUEST = 'Bad Request';
  static readonly NOT_FOUND = 'Not Found';
  static readonly INTERNAL_SERVER_ERROR = 'Internal Server Error';
  static readonly UNAUTHORIZED = 'Unauthorized';
  static readonly FORBIDDEN = 'Forbidden';
  static readonly CONFLICT = 'Conflict';
}

export const throwError = (
  message: string,
  status: HttpStatus = HttpStatus.BAD_REQUEST,
): never => {
  throw new HttpException(message, status);
};
