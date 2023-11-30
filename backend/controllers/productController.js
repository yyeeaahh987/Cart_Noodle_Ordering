const productController = require("express").Router();
const Product = require("../models/Food");
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

//get one
productController.get("/find/:id", verifyToken, async (req, res) => {
  try {
    const productID = req.params.id;
    const product = await Product.findById(productID);
    if (!product) {
      return res.status(500).json({ msg: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (err) {
    console.error(err);
  }
});

//create product
productController.post("/", verifyTokenAdmin, async (req, res) => {
  try {
    const newProduct = await Product.create({ ...req.body });
    return res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
  }
});

module.exports = productController;
