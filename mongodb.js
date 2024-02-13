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
    const db = client.db(databaseName);

    db.collection("tasks").findOne(
      { _id: new ObjectId("65caea869508f43b7a9081a6") },
      (error, result) => {
        console.log("Last task: ", result);
      }
    );

    db.collection("tasks")
      .find({ complete: false })
      .toArray((error, result) => {
        console.log(result);
      });

    // db.collection("tasks").insertMany([
    //   { description: "Walk", complete: false },
    //   { description: "Jog", complete: false },
    //   { description: "Sprint", complete: false },
    // ]);

    // db.collection("users").findOne(
    //   { _id: new ObjectId("65ca5d546591516985494555") },
    //   (error, result) => {
    //     if (error) {
    //       return console.log(`Can't find ${this.name} in users table!`);
    //     }
    //     console.log(result);
    //   }
    // );

    // db.collection("users")
    //   .find({ age: 29 })
    //   .toArray((error, result) => {
    //     console.log(result);
    //   });
    //cleaned
  }
);
