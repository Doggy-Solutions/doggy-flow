import app from './app.js';
import { config } from './config/env.config.js';
import { logger, env } from './config/index.js';

app.listen(config.port, () => {
  console.log(`🚀 API Core running on port ${env.PORT}`);
  logger.info(`API Core started on port ${env.PORT}`);
});
