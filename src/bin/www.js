import app from '../app';
import logger from '../utils/logger';
import config from '../config/config';
const { port, hostName } = config.serverDetails;
// finally, let's start our server...
const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  logger.info(`Listening on ${hostName}: ${server.address().port}`);
});

process.on('SIGINT', () => {
  logger.info('Server shutting down');
  logger.info('Server shut down success');
  process.exit(0);
});