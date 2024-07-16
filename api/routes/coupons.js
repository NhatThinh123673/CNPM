const express = require("express");
const router = express.Router();
const Coupon = require("../models/Coupon");

// Route để lấy danh sách Coupons
router.get("/", async (req, res) => {
  try {
    const coupons = await Coupon.findAll();
    res.json(coupons);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route để lấy thông tin của một Coupon theo couponId
router.get("/:couponId", async (req, res) => {
  const { couponId } = req.params;
  try {
    const coupon = await Coupon.findByPk(couponId);
    if (!coupon) {
      return res.status(404).json({ msg: "Coupon not found" });
    }
    res.json(coupon);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route để tạo mới một Coupon
router.post("/", async (req, res) => {
  const { code, discount, expirationDate } = req.body;
  try {
    // Kiểm tra code có tồn tại không
    if (!code) {
      return res.status(400).json({ msg: "Code is required" });
    }

    const newCoupon = await Coupon.create({ code, discount, expirationDate });
    res.json(newCoupon);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route để cập nhật thông tin của một Coupon
router.put("/:couponId", async (req, res) => {
  const { couponId } = req.params;
  const { code, discount, expirationDate } = req.body;
  try {
    const coupon = await Coupon.findByPk(couponId);
    if (!coupon) {
      return res.status(404).json({ msg: "Coupon not found" });
    }

    // Cập nhật thông tin của coupon
    coupon.code = code;
    coupon.discount = discount;
    coupon.expirationDate = expirationDate;

    await coupon.save();
    res.json(coupon);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route để xóa một Coupon
router.delete("/:couponId", async (req, res) => {
  const { couponId } = req.params;
  try {
    const coupon = await Coupon.findByPk(couponId);
    if (!coupon) {
      return res.status(404).json({ msg: "Coupon not found" });
    }

    await coupon.destroy();
    res.json({ msg: "Coupon deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
