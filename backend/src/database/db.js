const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  const url= process.env.ATLAS_DATABASE;
  try {
    await mongoose.connect(url);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;