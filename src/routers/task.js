const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/tasks", auth, async (req, res) => {
  const task = new Task({ ...req.body, owner: req.user._id });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.get("/tasks", auth, async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    await req.user.populate({
      path: "tasks",
      match,
      options: {
        skip: parseInt(req.query.skip),
        limit: parseInt(req.query.limit),
        sort,
      },
    });
    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) {
      return res.status(404).send();
    }

    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isUpdate = updates.every((update) => allowedUpdates.includes(update));

  if (!isUpdate) {
    return res.status(406).send({ updateMessage: "Task update not allowed." });
  }

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }
    updates.forEach((update) => (task[update] = req.body[update]));
    task.save();

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
