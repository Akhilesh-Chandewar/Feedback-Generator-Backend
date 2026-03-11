export class ApiResponse<T = unknown> {
  statusCode: number;
  message: string;
  data?: T;
  timestamp: string;

  constructor(statusCode: number, message: string, data?: T) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.timestamp = new Date().toISOString();
  }
}
