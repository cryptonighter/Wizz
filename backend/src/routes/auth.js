const fastify = require('fastify');
const User = require('../models/User');
const Passphrase = require('../models/Passphrase');
const db = require('../config/database');

async function authRoutes(app, options) {
  // Verify passphrase
  app.post('/verify-passphrase', async (request, reply) => {
    const { passphrase } = request.body;
    
    if (!passphrase) {
      return reply.status(400).send({ error: 'Passphrase is required' });
    }
    
    try {
      const passphraseRecord = await Passphrase.findByHash(passphrase);
      
      if (!passphraseRecord) {
        return reply.status(401).send({ error: 'Invalid passphrase' });
      }
      
      if (passphraseRecord.is_claimed) {
        return reply.status(400).send({ error: 'Passphrase has already been used' });
      }
      
      // Store passphrase ID in session for registration
      request.session = { passphraseId: passphraseRecord.id };
      
      return reply.send({ valid: true });
    } catch (error) {
      console.error('Error verifying passphrase:', error);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });
  
  // Register user
  app.post('/register', async (request, reply) => {
    const { email, password } = request.body;
    
    if (!email || !password) {
      return reply.status(400).send({ error: 'Email and password are required' });
    }
    
    try {
      // Check if user already exists
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return reply.status(400).send({ error: 'User already exists' });
      }
      
      // Create user
      const user = await User.create(email, password);
      
      return reply.status(201).send({ user });
    } catch (error) {
      console.error('Error registering user:', error);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });
  
  // Login user
  app.post('/login', async (request, reply) => {
    const { email, password } = request.body;
    
    if (!email || !password) {
      return reply.status(400).send({ error: 'Email and password are required' });
    }
    
    try {
      // Find user
      const user = await User.findByEmail(email);
      if (!user) {
        return reply.status(401).send({ error: 'Invalid credentials' });
      }
      
      // Check password (in mock implementation, we compare plain text)
      if (password !== user.password_hash) {
        return reply.status(401).send({ error: 'Invalid credentials' });
      }
      
      // In a real app, you would create a session or JWT here
      // For now, we'll just return the user
      return reply.send({ user });
    } catch (error) {
      console.error('Error logging in:', error);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });
  
  // For testing purposes - get all users
  app.get('/users', async (request, reply) => {
    return reply.send(db._users);
  });
  
  // For testing purposes - get all passphrases
  app.get('/passphrases', async (request, reply) => {
    return reply.send(db._passphrases);
  });
  
  // For testing purposes - add a passphrase
  app.post('/add-passphrase', async (request, reply) => {
    const { passphrase } = request.body;
    
    if (!passphrase) {
      return reply.status(400).send({ error: 'Passphrase is required' });
    }
    
    try {
      const result = db.createPassphrase(passphrase);
      return reply.send({ id: result.id, message: 'Passphrase added successfully' });
    } catch (error) {
      console.error('Error adding passphrase:', error);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });
}

module.exports = authRoutes;