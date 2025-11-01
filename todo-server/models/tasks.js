'use strict';
const mongoose = require("mongoose");
const tasksSchema = new mongoose.Schema({
  name: String,
  description: String,
});
const Task = mongoose.model("Task", tasksSchema);
module.exports = Task;
