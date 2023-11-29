const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const authController = require("./controllers/authController");
const productController = require("./controllers/productController");
const uploadController = require("./controllers/uploadController");
const app = express();

//connect db
mongoose.connect(process.env.MONGO_URL);

//routes & middlewares
//first two lines make moddleswares req.body accessible
//cors() removes the cors error which caused by server hosted on port 5001 and client host on 3000
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static("public/images"));
app.use("/auth", authController);
app.use("/product", productController);
app.use("/upload", uploadController);

//start server
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
