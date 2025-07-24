const fastify = require('fastify');
const NotificationService = require('./services/notificationService');

// Factory function to create the server instance
function createServer(options = {}) {
  const app = fastify({ logger: true, ...options });

  // Register plugins
  app.register(require('@fastify/cors'), {
    origin: process.env.CLIENT_URL || 'http://localhost:3000'
  });

  // Register routes
  app.get('/', async (request, reply) => {
    return { message: 'Welcome to Wizz Backend API' };
  });

  // Health check endpoint
  app.get('/health', async (request, reply) => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'wizz-backend'
    };
  });

  // Register auth routes
  app.register(require('./routes/auth'), { prefix: '/auth' })
    .after((err) => {
      if (err) {
        app.log.error('Error registering auth routes:', err);
      } else {
        app.log.info('Auth routes registered successfully');
      }
    });

  // Register compass routes
  app.register(require('./routes/compass'), { prefix: '/compass' })
    .after((err) => {
      if (err) {
        app.log.error('Error registering compass routes:', err);
      } else {
        app.log.info('Compass routes registered successfully');
      }
    });

  // Register quest routes
  app.register(require('./routes/quest'), { prefix: '/quests' })
    .after((err) => {
      if (err) {
        app.log.error('Error registering quest routes:', err);
      } else {
        app.log.info('Quest routes registered successfully');
      }
    });

  // Initialize notification service
  const notificationService = new NotificationService();
  
  // Decorate the app with the notification service for access in routes if needed
  app.decorate('notificationService', notificationService);

  // Start the notification service when the server starts
  app.addHook('onReady', async () => {
    notificationService.start();
  });

  // Stop the notification service when the server stops
  app.addHook('onClose', async () => {
    notificationService.stop();
  });

  return app;
}

// Run the server if this file is executed directly
if (require.main === module) {
  const app = createServer();
  
  // Run the server
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
}

module.exports = createServer;