const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const songRouter = require("./routers/song");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.use(songRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
