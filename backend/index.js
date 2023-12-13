const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const https = require("https");
const fs = require("fs");
// import fs from 'fs';
const authController = require("./controllers/authController");
const productController = require("./controllers/productController");
const cashController = require("./controllers/cashController");
const app = express();

//connect db
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Database Connected");
});

//routes & middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authController);
app.use("/product", productController);
app.use("/cash", cashController);

//start server
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});

const key = fs.readFileSync(`${__dirname}/private.key`);
const cert = fs.readFileSync(`${__dirname}/certificate.crt`);

const cred = {
  key,
  cert,
};

const httpsPort = 8443;

const httpsServer = https.createServer(cred, app);
httpsServer.listen(httpsPort);
console.log(`https App is listening on port ${httpsPort} !`);
