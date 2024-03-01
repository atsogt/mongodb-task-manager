const mongoose = require("mongoose");
require("dotenv").config();
const connectToDatabase = async () => {
  try {
    await mongoose
      .connect(
        // process.env.MONGODB_URL
        "mongodb+srv://atsogt24:Cosset2011$@cluster0.c5f0oda.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
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
