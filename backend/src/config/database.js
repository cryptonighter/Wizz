// Mock database for development
// This is a temporary solution until we have a proper PostgreSQL setup

// In-memory storage
const users = [];
const passphrases = [];

// Helper functions
function findUserByEmail(email) {
  return users.find(user => user.email === email);
}

function findPassphraseByHash(phrase) {
  return passphrases.find(p => p.phrase === phrase);
}

function createUser(email, password) {
  const user = {
    id: require('crypto').randomUUID(),
    email,
    password_hash: password // In a real implementation, this would be hashed
  };
  users.push(user);
  return user;
}

function createPassphrase(phrase) {
  const passphrase = {
    id: require('crypto').randomUUID(),
    phrase,
    is_claimed: false,
    claimed_by_user_id: null
  };
  passphrases.push(passphrase);
  return passphrase;
}

function markPassphraseAsClaimed(id, userId) {
  const passphrase = passphrases.find(p => p.id === id);
  if (passphrase) {
    passphrase.is_claimed = true;
    passphrase.claimed_by_user_id = userId;
    return passphrase;
  }
  return null;
}

module.exports = {
  findUserByEmail,
  findPassphraseByHash,
  createUser,
  createPassphrase,
  markPassphraseAsClaimed,
  // For testing purposes
  _users: users,
  _passphrases: passphrases
};