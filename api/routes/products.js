const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Category = require("../models/Category");
const { Op } = require("sequelize");
// Route tìm kiếm sản phẩm
router.get("/search", async (req, res) => {
  const { query } = req.query;

  try {
    // Tìm kiếm sản phẩm theo tên hoặc mô tả
    const products = await Product.findAll({
      where: {
        [Op.or]: [
          { productName: { [Op.like]: `%${query}%` } },
          { des: { [Op.like]: `%${query}%` } },
        ],
      },
    });

    if (products.length === 0) {
      return res.status(404).json({ msg: "No products found" });
    }

    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route để lấy danh sách sản phẩm
router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category, as: "category" }],
    });
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route để lấy chi tiết một sản phẩm
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id, {
      include: [{ model: Category, as: "category" }],
    });
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route để tạo sản phẩm mới
router.post("/", async (req, res) => {
  const { productName, price, description, cateId } = req.body;
  try {
    // Kiểm tra xem các trường bắt buộc có tồn tại trong req.body không
    if (!productName || !price || !cateId) {
      return res
        .status(400)
        .json({ msg: "name, price, and cateId are required" });
    }

    const newProduct = await Product.create({
      productName,
      price,
      description,
      cateId,
    });
    res.json(newProduct);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route để cập nhật sản phẩm
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { productName, price, description, cateId } = req.body;
  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ msg: "Product not found" });

    product.productName = productName || product.productName;
    product.price = price || product.price;
    product.description = description || product.description;
    product.cateId = cateId || product.cateId;
    await product.save();

    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route để xóa sản phẩm
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ msg: "Product not found" });

    await product.destroy();
    res.json({ msg: "Product deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
