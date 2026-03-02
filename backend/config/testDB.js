const mongoose = require('mongoose');

const connectTestDB = async () => {
  try {
    // Use a separate test database
    const testDbUri = process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/student-planner-test';
    
    // Check if already connected
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
    
    const conn = await mongoose.connect(testDbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Test Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Test DB Error: ${error.message}`);
    // Don't exit in tests, just throw the error
    throw error;
  }
};

const disconnectTestDB = async () => {
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.close();
    console.log('Test database disconnected');
  }
};

const clearTestDB = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

module.exports = { connectTestDB, disconnectTestDB, clearTestDB };