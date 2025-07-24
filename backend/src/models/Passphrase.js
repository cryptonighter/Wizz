const db = require('../config/database');
const bcrypt = require('bcrypt');

class Passphrase {
  // Create a new passphrase
  static async create(phrase) {
    const passphrase = db.createPassphrase(phrase);
    return { id: passphrase.id };
  }

  // Find passphrase by hash
  static async findByHash(phrase) {
    const passphrase = db.findPassphraseByHash(phrase);
    if (passphrase) {
      return {
        id: passphrase.id,
        phrase_hash: passphrase.phrase, // In mock implementation, we store the plain text
        is_claimed: passphrase.is_claimed,
        claimed_by_user_id: passphrase.claimed_by_user_id
      };
    }
    return null;
  }

  // Mark passphrase as claimed
  static async markAsClaimed(id, userId) {
    const passphrase = db.markPassphraseAsClaimed(id, userId);
    if (passphrase) {
      return {
        id: passphrase.id,
        phrase_hash: passphrase.phrase,
        is_claimed: passphrase.is_claimed,
        claimed_by_user_id: passphrase.claimed_by_user_id
      };
    }
    return null;
  }
}

module.exports = Passphrase;