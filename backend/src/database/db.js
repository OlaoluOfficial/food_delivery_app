const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  const url= process.env.ATLAS_DATABASE;
  try {
<<<<<<< HEAD
    await mongoose.connect(url);
=======
    await mongoose.connect(process.env.DATABASE_URL);
>>>>>>> 4b8133b34e3c62e1ec093ade2eaba39da8c49667
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;