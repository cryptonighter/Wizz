const fastify = require('fastify');
const Compass = require('../models/Compass');

async function compassRoutes(app, options) {
  // Create or update compass for authenticated user
  app.post('/', async (request, reply) => {
    // In a real implementation, we would get the user ID from the session or JWT
    // For now, we'll use a placeholder user ID
    const userId = 'test-user-id';
    
    try {
      const compass = await Compass.create(userId, request.body);
      return reply.status(201).send(compass);
    } catch (error) {
      console.error('Error creating compass:', error);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });

  // Get compass for authenticated user
  app.get('/', async (request, reply) => {
    // In a real implementation, we would get the user ID from the session or JWT
    // For now, we'll use a placeholder user ID
    const userId = 'test-user-id';
    
    try {
      const compass = await Compass.getByUserId(userId);
      if (!compass) {
        return reply.status(404).send({ error: 'Compass not found' });
      }
      return reply.send(compass);
    } catch (error) {
      console.error('Error getting compass:', error);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });

  // Update compass for authenticated user
  app.put('/', async (request, reply) => {
    // In a real implementation, we would get the user ID from the session or JWT
    // For now, we'll use a placeholder user ID
    const userId = 'test-user-id';
    
    try {
      const compass = await Compass.updateByUserId(userId, request.body);
      if (!compass) {
        return reply.status(404).send({ error: 'Compass not found' });
      }
      return reply.send(compass);
    } catch (error) {
      console.error('Error updating compass:', error);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });
}

module.exports = compassRoutes;