const { mongoose, Schema } = require("mongoose");
const validator = require("validator");

const taskSchema = new Schema({
  description: { type: String, require: true, trim: true, validate(value) {} },
  completed: { type: Boolean, require: true, default: false },
});

const task = mongoose.model("Task", taskSchema);

module.exports = task;
