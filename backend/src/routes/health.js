const fastify = require('fastify');

async function healthRoutes(app, options) {
  // Health check endpoint
  app.get('/health', async (request, reply) => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'wizz-backend'
    };
  });
}

module.exports = healthRoutes;