const fastify = require('fastify');
const Quest = require('../models/Quest');

async function questRoutes(app, options) {
  // Create a new quest for authenticated user
  app.post('/', async (request, reply) => {
    // In a real implementation, we would get the user ID from the session or JWT
    // For now, we'll use a placeholder user ID
    const userId = 'test-user-id';
    
    try {
      const quest = await Quest.create(userId, request.body);
      return reply.status(201).send(quest);
    } catch (error) {
      console.error('Error creating quest:', error);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });

  // Get all quests for authenticated user
  app.get('/', async (request, reply) => {
    // In a real implementation, we would get the user ID from the session or JWT
    // For now, we'll use a placeholder user ID
    const userId = 'test-user-id';
    
    try {
      const quests = await Quest.getAllByUserId(userId);
      return reply.send(quests);
    } catch (error) {
      console.error('Error getting quests:', error);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });

  // Get a specific quest by ID
  app.get('/:id', async (request, reply) => {
    try {
      const quest = await Quest.getById(request.params.id);
      if (!quest) {
        return reply.status(404).send({ error: 'Quest not found' });
      }
      return reply.send(quest);
    } catch (error) {
      console.error('Error getting quest:', error);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });

  // Update a quest by ID
  app.put('/:id', async (request, reply) => {
    try {
      const quest = await Quest.updateById(request.params.id, request.body);
      if (!quest) {
        return reply.status(404).send({ error: 'Quest not found' });
      }
      return reply.send(quest);
    } catch (error) {
      console.error('Error updating quest:', error);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });

  // Add a check-in to a quest
  app.post('/:id/check-ins', async (request, reply) => {
    try {
      const checkIn = await Quest.addCheckIn(request.params.id, request.body);
      if (!checkIn) {
        return reply.status(404).send({ error: 'Quest not found' });
      }
      return reply.status(201).send(checkIn);
    } catch (error) {
      console.error('Error adding check-in:', error);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });

  // Get all check-ins for a quest
  app.get('/:id/check-ins', async (request, reply) => {
    try {
      const checkIns = await Quest.getCheckInsByQuestId(request.params.id);
      return reply.send(checkIns);
    } catch (error) {
      console.error('Error getting check-ins:', error);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });
}

module.exports = questRoutes;