const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/task-manager-api")
  .then(() => console.log("connected"))
  .catch((error) => console.log("ERROR: ", error));

// const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String },
  age: { type: Number },
});

const User = mongoose.model("User", UserSchema);
// const User = mongoose.model("User", {
//   name: { type: String },
//   age: { type: Number },
// });

// const me = new User({ name: "Coco", age: 4 });

// me.save()
//   .then((result) => console.log("User added: ", result))
//   .catch((error) => console.log("Error", error));

const Task = mongoose.model("Tasks", {
  description: { type: String },
  completed: { type: Boolean },
});

const newTask = new Task({ description: "Read", completed: false });

newTask
  .save()
  .then((result) => console.log(result))
  .catch((error) => console.log(error));
