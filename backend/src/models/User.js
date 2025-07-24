const db = require('../config/database');
const bcrypt = require('bcrypt');

class User {
  // Create a new user
  static async create(email, password) {
    // In mock implementation, we don't hash the password
    const user = db.createUser(email, password);
    return { id: user.id, email: user.email };
  }

  // Find user by email
  static async findByEmail(email) {
    const user = db.findUserByEmail(email);
    if (user) {
      return { id: user.id, email: user.email, password_hash: user.password_hash };
    }
    return null;
  }

  // Find user by ID
  static async findById(id) {
    // In a real implementation, we would query the database
    // For now, we'll search in our in-memory storage
    const user = db._users.find(u => u.id === id);
    if (user) {
      return { id: user.id, email: user.email };
    }
    return null;
  }
}

module.exports = User;