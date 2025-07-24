// Wizz Backend - Main Entry Point
const createServer = require('./server.js');

// Create and start the server
const app = createServer();

const start = async () => {
  try {
    await app.listen({ port: process.env.PORT || 3001, host: '0.0.0.0' });
    app.log.info(`Server listening on ${app.server.address().port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();