const { mongoose, Schema } = require("mongoose");

const songSchema = new Schema({
  title: {
    type: String,
    require: false,
    trim: true,
  },
  artist: {
    type: String,
    require: false,
    trim: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const song = mongoose.model("Song", songSchema);

module.exports = song;
