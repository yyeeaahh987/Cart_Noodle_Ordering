const uploadController = require("express").Router();
const multer = require("multer");
const { verifyToken } = require("../middlewares/verifyToken");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (res, file, cb) => {
    cb(null, req.body.filename);
  },
});

const upload = multer({ storage: storage });

uploadController.post(
  "/image",
  verifyToken,
  upload.single("image"),
  (req, res) => {
    try {
      return res.status(200).json("File uploaded successfully");
    } catch (err) {
      console.error(err);
    }
  }
);

module.exports = uploadController;
