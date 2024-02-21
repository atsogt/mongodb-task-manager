require("../src/db/mongoose");
const Task = require("../src/models/task");

Task.findByIdAndUpdate("65d4d5920ff75c07b203822e", {
  description: "Practice Gratitude",
  completed: true,
})
  .then((task) => {
    console.log(task);
    return Task.countDocuments({ completed: true });
  })
  .then((result) => console.log(result))
  .catch((e) => console.log(e));
