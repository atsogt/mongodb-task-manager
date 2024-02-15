const { MongoClient, ObjectId } = require("mongodb-legacy");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(connectionURL, (error, client) => {
  if (error) return console.log("Unable to connect to database!");

  const db = client.db(databaseName);

  // db.collection("users")
  //   .insertMany([
  //     { _id: new ObjectId(), name: "x", age: -100 },
  //     { _id: new ObjectId(), name: "x", age: -100 },
  //     { _id: new ObjectId(), name: "x", age: -100 },
  //     { _id: new ObjectId(), name: "x", age: -100 },
  //   ])
  //   .then((result) => console.log(result))
  //   .catch((error) => console.log(error));

  db.collection("users")
    .deleteMany({ age: -100 })
    .then((result) => console.log("Deleted Contents", result))
    .catch((error) => console.log("Error: ", error));
});
