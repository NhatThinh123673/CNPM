const express = require("express");
const router = express.Router();
const Banner = require("../models/Banner");

// Route để lấy danh sách Banners
router.get("/", async (req, res) => {
  try {
    const banners = await Banner.findAll();
    res.json(banners);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route để lấy thông tin của một Banner theo bannerId
router.get("/:bannerId", async (req, res) => {
  const { bannerId } = req.params;
  try {
    const banner = await Banner.findByPk(bannerId);
    if (!banner) {
      return res.status(404).json({ msg: "Banner not found" });
    }
    res.json(banner);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route để tạo mới một Banner
router.post("/", async (req, res) => {
  const { img, link } = req.body;
  try {
    // Kiểm tra img có tồn tại không
    if (!img) {
      return res.status(400).json({ msg: "Image URL is required" });
    }

    const newBanner = await Banner.create({ img, link });
    res.json(newBanner);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route để cập nhật thông tin của một Banner
router.put("/:bannerId", async (req, res) => {
  const { bannerId } = req.params;
  const { img, link } = req.body;
  try {
    const banner = await Banner.findByPk(bannerId);
    if (!banner) {
      return res.status(404).json({ msg: "Banner not found" });
    }

    // Cập nhật thông tin của banner
    banner.img = img;
    banner.link = link;

    await banner.save();
    res.json(banner);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route để xóa một Banner
router.delete("/:bannerId", async (req, res) => {
  const { bannerId } = req.params;
  try {
    const banner = await Banner.findByPk(bannerId);
    if (!banner) {
      return res.status(404).json({ msg: "Banner not found" });
    }

    await banner.destroy();
    res.json({ msg: "Banner deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
