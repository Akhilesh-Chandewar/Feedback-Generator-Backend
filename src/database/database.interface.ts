import mongoose from 'mongoose';

export interface ConnectionStatus {
  isConnected: boolean;
  readyState: mongoose.Connection['readyState'];
  host?: string;
  name?: string;
}
