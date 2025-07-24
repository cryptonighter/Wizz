const db = require('../src/config/database');

async function seedPassphrases() {
  try {
    // Create some test passphrases
    const passphrases = [
      'wizz-test-123',
      'alignment-engine-456',
      'personal-growth-789'
    ];
    
    for (const phrase of passphrases) {
      const result = db.createPassphrase(phrase);
      console.log(`Created passphrase with ID: ${result.id}`);
    }
    
    console.log('Passphrases seeded successfully!');
    console.log('Current passphrases:', db._passphrases);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding passphrases:', error);
    process.exit(1);
  }
}

seedPassphrases();