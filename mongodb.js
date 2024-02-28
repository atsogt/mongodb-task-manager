const { MongoClient, ObjectId } = require("mongodb-legacy");

const connectionURL = process.env.MONGODB_URL;
const databaseName = "task-manager";

MongoClient.connect(connectionURL, (error, client) => {
  if (error) return console.log("Unable to connect to database!");

  const db = client.db(databaseName);
  db.collection("users")
    .deleteMany({ age: -100 })
    .then((result) => console.log("Deleted Contents", result))
    .catch((error) => console.log("Error: ", error));
});
