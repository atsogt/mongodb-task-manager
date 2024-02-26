const express = require("express");
require("./db/mongoose");
const jwt = require("jsonwebtoken");
const Task = require("./models/task");
const User = require("./models/user");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const songRouter = require("./routers/song");

const app = express();
const PORT = process.env.PORT || 3000;

// app.use((req, res, next) => {
//   const method = req.method;

//   switch (method) {
//     case "GET":
//       console.log(req.method);
//       next();
//     default:
//       res.status(503).send({ Message: "App is in maintenance" });
//   }
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.use(songRouter);

// const myFunction = () => {
//   const token = jwt.sign({ _id: "abc123" }, "mytokenSignature"); //secret signature
//   // console.log(token);
//   //header(metadata),payload {{"_id":"abc123","iat":1708624210} issued at},signature to verify token
//   const data = jwt.verify(token, "mytokenSignature");
//   console.log(data);
// };

// myFunction();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// const main = async () => {
//   const task = await Task.findById("65d94d13710dd4b866763967");
//   // await task.populate("");
//   // await task.populate("owner");
//   // console.log(task);

//   const user = await User.findById("65d768e328f8330be8fa2fbf");
//   await user.populate("tasks");
//   // console.log(user.tasks);
// };

// main();
