require("../src/db/mongoose");
const Task = require("../src/models/task");

// Task.findByIdAndDelete("65cf6cfeaaae81b335451083")
//   .then((result) => {
//     console.log(result);
//     return Task.countDocuments({ completed: false });
//   })
//   .then((incompleteTask) => console.log(incompleteTask))
//   .catch((e) => console.log(e));

const deleteTaskAndCount = async (id) => {
  await Task.findByIdAndDelete(id);
  const count = Task.countDocuments({ completed: false });
  return count;
};

deleteTaskAndCount("65cf6e50429d8cfebd451d7c").then((count) =>
  console.log(count)
);
