const express = require("express");
require("./db/mongoose");
const jwt = require("jsonwebtoken");
const Task = require("./models/task");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

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
