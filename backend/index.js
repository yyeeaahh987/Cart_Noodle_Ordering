const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const app = express();

//connect db
mongoose.connect(process.env.MONGO_URL);

// mongoose.connect(process.env.MONGO_URL, () =>
//   console.log("DB is successfully connected")
// );

//start server
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
