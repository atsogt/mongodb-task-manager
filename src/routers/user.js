const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth"); // for sign up and login

router.get("/users/me", auth, async (req, res) => {
  console.log("Route handler");
  res.send(req.user);
});

router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/users", async (req, res) => {
  try {
    const user = await new User(req.body).save();
    const token = await user.generateAuthToken();
    if (!user) {
      return res.status(404).send();
    }
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    console.log(user, token);
    // res.status(200).send(user);
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch("/users/:id", async (req, res) => {
  //grabs keys
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "age", "password"];
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate) {
    return res.status(406).send({ updateMessage: "Update not allowed" });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    //dynamic update
    updates.forEach((update) => {
      user[update] = req.body[update];
    });

    user.save();

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      res.status(404).send({ Message: "User not found!" });
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
