const db = require('../config/connection');
const { User } = require('../models');
const cleanDB = require('./cleanDB');
const fs = require('fs');
const path = require('path');

const testDataFilePath = path.join(__dirname, 'TestData.json'); // Path to your TestData.json file

db.once('open', async () => {
  await cleanDB('User', 'users');
  // Add more cleanDB calls for other models if needed

  const testData = fs.readFileSync(testDataFilePath, 'utf8'); // Read the JSON data from the file
  const jsonData = JSON.parse(testData); // Parse the JSON data

  // Seed users
  await User.insertMany(jsonData.users);

  console.log('Users seeded!');
  console.log('Test data seeded!');
  process.exit(0);
});
