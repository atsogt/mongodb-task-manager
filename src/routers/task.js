const express = require("express");
const router = new express.Router();
const Task = require("../models/task");
const auth = require("../middleware/auth");

router.get("/tasks", auth, async (req, res) => {
  try {
    // const tasks = await Task.find({ owner: req.user._id });
    await req.user.populate("tasks");
    res.send(req.user.tasks);
  } catch (error) {
    res.status(500).send(e);
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  // console.log(_id);
  try {
    console.log("owner", req.user._id);
    const task = await Task.findOne({ _id, owner: req.user._id });
    console.log(task);
    if (!task) {
      return res.status(404).send();
    }

    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/tasks", auth, async (req, res) => {
  try {
    const task = new Task({ ...req.body, owner: req.user._id });
    // console.log("Owner ID: ", req.user._id);
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isUpdate = updates.every((update) => allowedUpdates.includes(update));

  if (!isUpdate) {
    return res.status(406).send({ updateMessage: "Task update not allowed." });
  }
  const _id = req.params.id;

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
