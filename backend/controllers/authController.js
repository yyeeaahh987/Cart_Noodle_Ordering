const authController = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register, req: request, res: response
authController.post("/register", async (req, res) => {
  try {
    const isExisting = await User.findOne({ email: req.body.email });
    if (isExisting) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // can use "...req.body" to replace "email: req.body.email, username:req.body.username"
    const newUser = await User.create({
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
    });
    const { password, ...others } = newUser._doc;
    const token = jwt.sign(
      { id: newUser._id, isAdmin: newUser.isAdmin },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "5h" }
    );

    return res.status(201).json({ ...others, token });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//login
authController.post("/login", async (req, res) => {
  try {
    //find user
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("Email does not exist");
    }

    //check password
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      throw new Error("Password is incorrect");
    }

    const { password, ...others } = user._doc;
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "5h" }
    );

    return res.status(200).json({ ...others, token });
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

module.exports = authController;
