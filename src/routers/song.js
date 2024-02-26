const express = require("express");
const router = new express.Router();
const Song = require("../models/song");
const auth = require("../middleware/auth");

router.post("/songs", auth, async (req, res) => {
  try {
    const song = new Song({
      ...req.body,
      owner: req.user._id,
    });
    await song.save();
    res.status(201).send(song);
  } catch (e) {
    res.status(500).send({ error: "Song not added!" });
  }
});

router.get("/songs", auth, async (req, res) => {
  try {
    await req.user.populate({
      path: "songs",
    });
    res.send(req.user.songs);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/songs/:id", auth, async (req, res) => {
  try {
    const song = await Song.findOne({});

    res.send(req.user.songs);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
