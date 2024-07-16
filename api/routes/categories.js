const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

// Route để lấy danh sách danh mục
router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route để tạo danh mục mới
router.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    console.log(req.body);
    // Kiểm tra xem name có tồn tại trong req.body không
    if (!name) {
      return res.status(400).json({ msg: "Name is required" });
    }

    const newCategory = await Category.create({ name });
    res.json(newCategory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route để cập nhật danh mục
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ msg: "Category not found" });

    category.name = name;
    await category.save();

    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route để xóa danh mục
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ msg: "Category not found" });

    await category.destroy();
    res.json({ msg: "Category deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
