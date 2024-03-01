const express = require("express");
require("./db/mongoose");
require("dotenv").config();
const cors = require("cors");
const userRouter = require("./routers/user");
// const taskRouter = require("./routers/task");
// const songRouter = require("./routers/song");

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT;

app.use(userRouter);
// app.use(taskRouter);
// app.use(songRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
