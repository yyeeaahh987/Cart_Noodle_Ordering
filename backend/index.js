const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const authController = require("./controllers/authController");
const app = express();

//connect db
mongoose.connect(process.env.MONGO_URL);

//routes & middlewares
//first two lines make moddleswares req.body accessible
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authController);

//start server
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
