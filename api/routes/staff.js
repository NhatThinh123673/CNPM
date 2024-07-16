const express = require("express");
const router = express.Router();
const SalesStaff = require("../models/SalesStaff");

// Route để lấy danh sách SalesStaff
router.get("/", async (req, res) => {
  try {
    const staffList = await SalesStaff.findAll();
    res.json(staffList);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route để lấy thông tin của một SalesStaff theo id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const staff = await SalesStaff.findByPk(id);
    if (!staff) {
      return res.status(404).json({ msg: "Sales staff not found" });
    }
    res.json(staff);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route để tạo mới một SalesStaff
router.post("/", async (req, res) => {
  const { email, password, adminState } = req.body;
  try {
    // Kiểm tra email và password có tồn tại không
    if (!email || !password || !adminState) {
      return res
        .status(400)
        .json({ msg: "Please include email, password, and adminState" });
    }

    const newStaff = await SalesStaff.create({ email, password, adminState });
    res.json(newStaff);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route để cập nhật thông tin của một SalesStaff
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { email, password, adminState } = req.body;
  try {
    const staff = await SalesStaff.findByPk(id);
    if (!staff) {
      return res.status(404).json({ msg: "Sales staff not found" });
    }

    // Cập nhật thông tin của staff
    staff.email = email;
    staff.password = password;
    staff.adminState = adminState;

    await staff.save();
    res.json(staff);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route để xóa một SalesStaff
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const staff = await SalesStaff.findByPk(id);
    if (!staff) {
      return res.status(404).json({ msg: "Sales staff not found" });
    }

    await staff.destroy();
    res.json({ msg: "Sales staff deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
