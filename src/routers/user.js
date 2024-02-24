const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth"); // for sign up and login

router.get("/users/me", auth, async (req, res) => {
  // console.log("Route handler");
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
//url, middleware, route handler
//generating authtoken so you don't need to retreive auth token
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    // console.log(user, token);
    // res.status(200).send(user);
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    //filetering out token
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    // console.log(req.user.tokens);
    await req.user.save();
    // console.log(req.user);
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res
      .status(200)
      .send("All tokens deleted. User is logged out of every device");
  } catch (error) {
    res.status(500).send();
  }
});

router.patch("/users/me", auth, async (req, res) => {
  //grabs keys
  const updates = Object.keys(req.body);
  // console.log(updates);
  const allowedUpdates = ["name", "email", "age", "password"];
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate) {
    return res.status(406).send({ updateMessage: "Update not allowed" });
  }

  try {
    const user = req.user;
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

router.delete("/users/me", auth, async (req, res) => {
  // res.send("hit");
  try {
    await req.user.deleteOne({ _id: req.user._id });
    res.send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
  // try {
  //   const user = await User.findByIdAndDelete(req.params.id);
  //   if (!user) {
  //     res.status(404).send({ Message: "User not found!" });
  //   }
  //   res.status(200).send(user);
  // } catch (error) {
  //   res.status(500).send(error);
  // }
});

module.exports = router;
