import {
  Injectable,
  OnModuleInit,
  OnApplicationShutdown,
  Inject,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import mongoose, { ConnectOptions } from 'mongoose';
import { ConnectionStatus } from './database.interface';

const MAX_RETRIES = 3;
const RETRY_INTERVAL = 5000;

@Injectable()
export class DatabaseService implements OnModuleInit, OnApplicationShutdown {
  getModel(arg0: string) {
    throw new Error('Method not implemented.');
  }
  private retryCount = 0;
  private isConnected = false;

  async onModuleInit() {
    await this.connect();
  }

  async connect(): Promise<void> {
    try {
      const uri = process.env.DATABASE_URL;

      if (!uri) {
        throw new Error('MongoDB URI not defined');
      }

      const options: ConnectOptions = {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4,
      };

      if (process.env.NODE_ENV === 'development') {
        mongoose.set('debug', true);
      }

      await mongoose.connect(uri, options);

      this.retryCount = 0;
    } catch (error) {
      this.logger.error('MongoDB connection failed', error);
      await this.handleConnectionError();
    }
  }

  getConnectionStatus(): ConnectionStatus {
    return {
      isConnected: this.isConnected,
      readyState: mongoose.connection.readyState,
      host: mongoose.connection.host,
      name: mongoose.connection.name,
    };
  }

  private async handleConnectionError(): Promise<void> {
    if (this.retryCount < MAX_RETRIES) {
      this.retryCount++;

      this.logger.info(
        `Retrying MongoDB connection... ${this.retryCount}/${MAX_RETRIES}`,
      );

      await new Promise((res) => setTimeout(res, RETRY_INTERVAL));

      return this.connect();
    }

    this.logger.error('MongoDB connection failed after max retries');
    process.exit(1);
  }

  private handleDisconnection() {
    if (!this.isConnected) {
      this.logger.info('Reconnecting to MongoDB...');
      this.connect();
    }
  }

  async onApplicationShutdown() {
    await mongoose.connection.close();
    this.logger.info('MongoDB connection closed');
  }

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {
    mongoose.set('strictQuery', true);

    mongoose.connection.on('connected', () => {
      this.logger.info('MongoDB connected');
      this.isConnected = true;
    });

    mongoose.connection.on('error', (err) => {
      this.logger.error('MongoDB error', err);
      this.isConnected = false;
    });

    mongoose.connection.on('disconnected', () => {
      this.logger.warn('MongoDB disconnected');
      this.isConnected = false;
      this.handleDisconnection();
    });
  }
}
