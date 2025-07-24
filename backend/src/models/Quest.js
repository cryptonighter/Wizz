const db = require('../config/database');

class Quest {
  // Create a new quest for a user
  static async create(userId, questData) {
    // In a real implementation, we would insert into the database
    // For now, we'll store in our in-memory database
    const quest = {
      id: require('crypto').randomUUID(),
      user_id: userId,
      title: questData.title,
      description: questData.description,
      status: 'active',
      created_at: new Date().toISOString(),
      check_ins: []
    };
    
    db._quests.push(quest);
    return quest;
  }

  // Get all quests for a user
  static async getAllByUserId(userId) {
    return db._quests.filter(q => q.user_id === userId);
  }

  // Get a specific quest by ID
  static async getById(id) {
    return db._quests.find(q => q.id === id) || null;
  }

  // Update a quest by ID
  static async updateById(id, questData) {
    const quest = db._quests.find(q => q.id === id);
    if (quest) {
      Object.assign(quest, questData);
      return quest;
    }
    return null;
  }

  // Add a check-in to a quest
  static async addCheckIn(questId, checkInData) {
    const quest = db._quests.find(q => q.id === questId);
    if (quest) {
      const checkIn = {
        id: require('crypto').randomUUID(),
        quest_id: questId,
        data: checkInData,
        created_at: new Date().toISOString()
      };
      
      quest.check_ins.push(checkIn);
      return checkIn;
    }
    return null;
  }

  // Get all check-ins for a quest
  static async getCheckInsByQuestId(questId) {
    const quest = db._quests.find(q => q.id === questId);
    if (quest) {
      return quest.check_ins;
    }
    return [];
  }
}

// Initialize quests array in mock database if it doesn't exist
if (!db._quests) {
  db._quests = [];
}

module.exports = Quest;