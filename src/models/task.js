const { mongoose, Schema } = require("mongoose");
const validator = require("validator");

const taskSchema = new Schema({
  description: { type: String, require: true, trim: true, validate(value) {} },
  completed: { type: Boolean, require: true, default: false },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const task = mongoose.model("Task", taskSchema);

module.exports = task;
