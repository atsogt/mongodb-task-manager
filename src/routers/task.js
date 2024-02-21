const express = require("express");
const router = new express.Router();
const Task = require("../models/task");

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (error) {
    res.status(500).send(e);
  }
});

router.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findById(_id);

    if (!task) {
      return res.status(404).send();
    }

    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/tasks", async (req, res) => {
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

router.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isUpdate = updates.every((update) => allowedUpdates.includes(update));

  if (!isUpdate) {
    res.status(406).send({ updateMessage: "Task update not allowed." });
  }
  const _id = req.params.id;

  try {
    const task = await Task.findByIdAndUpdate(_id, req.body, {
      new: true,
      validator: true,
    });

    if (!task) {
      res.status(404).send({ message: "Task not found" });
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      res.status(404).send(`Message: "Task not found!"`);
    }
    res.status(200).send(`Task: ${task.description} deleted!`);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
