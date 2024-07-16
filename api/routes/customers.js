const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");

// Route để lấy danh sách Customers
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route để lấy thông tin của một Customer theo accountId
router.get("/:accountId", async (req, res) => {
  const { accountId } = req.params;
  try {
    const customer = await Customer.findByPk(accountId);
    if (!customer) {
      return res.status(404).json({ msg: "Customer not found" });
    }
    res.json(customer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route để tạo mới một Customer
router.post("/", async (req, res) => {
  const { email, password, name, phone, address } = req.body;
  try {
    // Kiểm tra email và password có tồn tại không
    if (!email || !password) {
      return res.status(400).json({ msg: "Please include email and password" });
    }

    const newCustomer = await Customer.create({
      email,
      password,
      name,
      phone,
      address,
    });
    res.json(newCustomer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route để cập nhật thông tin của một Customer
router.put("/:accountId", async (req, res) => {
  const { accountId } = req.params;
  const { email, password, name, phone, address } = req.body;
  try {
    const customer = await Customer.findByPk(accountId);
    if (!customer) {
      return res.status(404).json({ msg: "Customer not found" });
    }

    // Cập nhật thông tin của customer
    customer.email = email;
    customer.password = password;
    customer.name = name;
    customer.phone = phone;
    customer.address = address;

    await customer.save();
    res.json(customer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route để xóa một Customer
router.delete("/:accountId", async (req, res) => {
  const { accountId } = req.params;
  try {
    const customer = await Customer.findByPk(accountId);
    if (!customer) {
      return res.status(404).json({ msg: "Customer not found" });
    }

    await customer.destroy();
    res.json({ msg: "Customer deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
