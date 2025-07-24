const db = require('../config/database');

class Compass {
  // Create a new compass for a user
  static async create(userId, compassData) {
    // In a real implementation, we would insert into the database
    // For now, we'll store in our in-memory database
    const compass = {
      user_id: userId,
      ...compassData
    };
    
    // Check if user already has a compass
    const existingCompass = db._compasses.find(c => c.user_id === userId);
    if (existingCompass) {
      // Update existing compass
      Object.assign(existingCompass, compass);
    } else {
      // Create new compass
      db._compasses.push(compass);
    }
    
    return compass;
  }

  // Get compass by user ID
  static async getByUserId(userId) {
    const compass = db._compasses.find(c => c.user_id === userId);
    return compass || null;
  }

  // Update compass by user ID
  static async updateByUserId(userId, compassData) {
    const compass = db._compasses.find(c => c.user_id === userId);
    if (compass) {
      Object.assign(compass, compassData);
      return compass;
    }
    return null;
  }
}

// Initialize compasses array in mock database if it doesn't exist
if (!db._compasses) {
  db._compasses = [];
}

module.exports = Compass;