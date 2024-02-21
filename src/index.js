const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");
const Task = require("./models/task");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose
  .connect("mongodb://127.0.0.1:27017/task-manager-api")
  .then(() => console.log("connected"))
  .catch((error) => console.log("ERROR: ", error));

app.use(express.json());

app.get("/users", (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((e) => res.status(500).send(e));

  // console.log(typeof users);
});

app.get("/users/:id", (req, res) => {
  console.log(req.params);
  // User.find({ _id: req.params.id })
  //   .then((user) => {
  //     res.status(200).send(user);
  //   })
  //   .catch((e) => res.status(400).send(e));
  const _id = req.params.id;
  User.findById(_id)
    .then((user) => {
      if (!user) {
        return res.status(400);
      }
      res.send(user);
    })
    .catch((e) => res.status(500).send(e));
});

app.get("/tasks", (req, res) => {
  Task.find({})
    .then((tasks) => {
      if (!tasks) {
        return res.status(400).send("Tasks can't be retreived");
      }
      res.send(tasks);
    })
    .catch((e) => res.status(500).send(e));
});

app.get("/tasks/:id", (req, res) => {
  const taskId = req.params.id;
  Task.findById(taskId)
    .then((task) => {
      if (!task) {
        res.status(404).send("Task cannot be found");
      }
      res.status(200).send(task);
    })
    .catch((e) => res.status(500).send(e));
});

app.post("/user", (req, res) => {
  const user = new User(req.body);
  console.log("User Added: ", user);
  user
    .save()
    .then(() => res.send(user))
    .catch((error) => res.status(400).send(error));
});

app.post("/tasks", async (req, res) => {
  console.log("Request.Body: ", req.body);
  try {
    if (req.body.description && req.body.completed) {
      const task = new Task(req.body);
      console.log("Task added: ", task);
      await task.save();
      res.status(201).send(task);
    } else {
      res.status(400).send({
        error: "Not valid body. Description and completed are required",
      });
    }
  } catch (e) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
