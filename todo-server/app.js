'use strict';
require("dotenv").config({ quiet: true });
const express = require("express");
const connectDB = require("./db/connect");
const cors = require('cors')
const app = express();
const tasks = require("./routes/tasks");
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());
app.get("/", (req, res) => {
  res.send("Task Manager");
});
app.use("/api/v1/tasks", tasks);
const port = process.env.PORT;
const start = () => {
  try {
    connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`server is running on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
