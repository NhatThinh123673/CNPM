const express = require("express");
const router = express.Router();
const Orders = require("../models/Orders");
const OrderItem = require("../models/OrderItem");
const Customer = require("../models/Customer");
const TypePayment = require("../models/TypePayment");

// Route để lấy danh sách các đơn hàng
router.get("/", async (req, res) => {
  try {
    const orders = await Orders.findAll({
      include: [
        { model: Customer, as: "customer" },
        { model: TypePayment, as: "typePayment" },
      ],
    });
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route để lấy danh sách đơn hàng theo accountId
router.get("/account/:accountId", async (req, res) => {
  const { accountId } = req.params;
  try {
    const orders = await Orders.findAll({
      where: {
        accountId: accountId,
      },
      include: OrderItem, // Include OrderItem model
    });

    if (orders.length === 0) {
      return res.status(404).json({ msg: "No orders found for this account" });
    }

    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// Route để lấy thông tin của một đơn hàng theo orderId
router.get("/:orderId", async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await Orders.findByPk(orderId, {
      include: [
        { model: Customer, as: "customer" },
        { model: TypePayment, as: "typePayment" },
      ],
    });
    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route để tạo mới một đơn hàng
router.post("/", async (req, res) => {
  const { accountId, state, codeCoupon, typePaymentId } = req.body;
  console.log(req.body);
  try {
    // Kiểm tra accountId và typePaymentId có tồn tại không
    if (!accountId || !typePaymentId) {
      return res
        .status(400)
        .json({ msg: "accountId and typePaymentId are required" });
    }

    // Lấy ngày hiện tại
    const orderDate = new Date();
    const totalPrice = 0;
    const newOrder = await Orders.create({
      accountId,
      totalPrice,
      orderDate,
      state,
      codeCoupon,
      typePaymentId,
    });
    res.json(newOrder);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route để xóa một đơn hàng
router.delete("/:orderId", async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await Orders.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    await order.destroy();
    res.json({ msg: "Order deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//Cập nhật trạng thái đơn hàng:
router.put("/:id/update-status", async (req, res) => {
  const { id } = req.params;
  const { state } = req.body;
  try {
    let order = await Orders.findByPk(id);
    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    order = await order.update({ state });

    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
