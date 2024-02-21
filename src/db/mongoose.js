const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api");
  } catch (error) {
    throw new Error(`Error connecting to the database: ${error.message}`);
  }
};

connectToDatabase();
