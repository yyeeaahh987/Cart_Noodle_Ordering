const productController = require("express").Router();
const Product = require("../models/Order");
const { verifyToken, verifyTokenAdmin } = require("../middlewares/verifyToken");

//get all
productController.get("/", verifyToken, async (req, res) => {
  try {
    const products = await Product.find(req.query);
    return res.status(200).json(products);
  } catch (err) {
    console.error(err);
  }
});

//update
productController.get("/update/:id", verifyTokenAdmin, async (req, res) => {
  try {
    const productID = req.params.id;
    const product = await Product.findById(productID);
    if (!product) {
      return res.status(500).json({ msg: "Order not found" });
    } else {
      product.Delivered = true;
      await product.save();
    }
    return res.status(200).json(product);
  } catch (err) {
    console.error(err);
  }
});

//create product
productController.post("/", verifyToken, async (req, res) => {
  try {
    const newProduct = await Product.create({ ...req.body });
    return res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
  }
});

module.exports = productController;