const mongoose = require("mongoose");
require("dotenv");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
  } catch (error) {
    throw new Error(`Error connecting to the database: ${error.message}`);
  }
};

connectToDatabase();
