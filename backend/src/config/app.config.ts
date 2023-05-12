import { registerAs } from '@nestjs/config';
import * as process from 'process';

export const appConfig = registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV,
  post: process.env.SERVER_PORT || 3000,
}));
