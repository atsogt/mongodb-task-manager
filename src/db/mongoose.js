const mongoose = require("mongoose");
require("dotenv").config();
const connectToDatabase = async () => {
  try {
    await mongoose
      .connect(
        // process.env.MONGODB_URL
      
      )
      .then(() => {
        console.log("Connected to database");
      });
  } catch (error) {
    throw new Error(`Error connecting to the database: ${error.message}`);
  }
};

connectToDatabase();

module.exports = connectToDatabase;
