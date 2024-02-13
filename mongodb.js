const { MongoClient, ObjectId } = require("mongodb-legacy");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

// const id = new ObjectId();
// console.log(id);
// console.log(id.getTimestamp());

MongoClient.connect(
  connectionURL,
  // { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database!");
    }

    console.log("Connected correctly!");

    const db = client.db(databaseName);

    // db.collection("users").insertOne(
    //   {
    //     _id: id,
    //     name: "Clayton",
    //     age: 21,
    //   },
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert user to collection users");
    //     }

    //     console.log("Inserted ID: " + result.insertedId);
    //   }
    // );

    // db.collection("users").insertMany([
    //   {
    //     name: "Bill",
    //     age: 32,
    //   },
    //   {
    //     name: "Coco",
    //     age: 4,
    //   },
    // ]);

    // db.collection("tasks").insertMany([
    //   { description: "Code", complete: false },
    //   { description: "Read", complete: true },
    //   { description: "Be Mindful", complete: false },
    // ]);
  }
);
