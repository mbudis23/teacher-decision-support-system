const mongoose = require('mongoose');

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('DB connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectMongoDB;
