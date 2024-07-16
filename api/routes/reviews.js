const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const Customer = require("../models/Customer");
const Product = require("../models/Product");

// Route để lấy danh sách reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: [
        { model: Customer, as: "customer" },
        { model: Product, as: "product" },
      ],
    });
    res.json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route để lấy thông tin của một review theo accountId và productId
router.get("/:accountId/:productId", async (req, res) => {
  const { accountId, productId } = req.params;
  try {
    const review = await Review.findOne({
      where: { accountId, productId },
      include: [
        { model: Customer, as: "customer" },
        { model: Product, as: "product" },
      ],
    });
    if (!review) {
      return res.status(404).json({ msg: "Review not found" });
    }
    res.json(review);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route để tạo mới một review
router.post("/", async (req, res) => {
  const { accountId, productId, content, rates } = req.body;
  try {
    // Kiểm tra accountId và productId có tồn tại không
    if (!accountId || !productId) {
      return res
        .status(400)
        .json({ msg: "accountId and productId are required" });
    }

    const newReview = await Review.create({
      accountId,
      productId,
      content,
      rates,
    });
    res.json(newReview);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route để cập nhật thông tin của một review
router.put("/:accountId/:productId", async (req, res) => {
  const { accountId, productId } = req.params;
  const { content, rates } = req.body;
  try {
    const review = await Review.findOne({ where: { accountId, productId } });
    if (!review) {
      return res.status(404).json({ msg: "Review not found" });
    }

    // Cập nhật thông tin của review
    review.content = content;
    review.rates = rates;

    await review.save();
    res.json(review);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route để xóa một review
router.delete("/:accountId/:productId", async (req, res) => {
  const { accountId, productId } = req.params;
  try {
    const review = await Review.findOne({ where: { accountId, productId } });
    if (!review) {
      return res.status(404).json({ msg: "Review not found" });
    }

    await review.destroy();
    res.json({ msg: "Review deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
