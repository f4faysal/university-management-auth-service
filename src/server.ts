import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import subscribeToEvents from './app/events';
import config from './config/index';
import { errorlogger, logger } from './shared/logger';
import { RedisClient } from './shared/redis';

process.on('uncaughtException', error => {
  errorlogger.error(error);
  process.exit(1);
});
let server: Server;
async function bootstap() {
  try {
    await RedisClient.connect().then(() => {
      subscribeToEvents();
    });

    await mongoose.connect(config.database__url as string);
    logger.info(`🛫 Database is connected 🎉 successfully`);
    server = app.listen(config.port, () => {
      logger.info(`👻 Application  listening on🪝  port ${config.port}`);
    });
  } catch (err) {
    errorlogger.error('🛑 Failed to connect  ☢️  Database ☣️', err);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorlogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
bootstap();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is Recived');
  if (server) {
    server.close();
  }
});
