const express = require("express");
const router = express.Router();
const OrderItem = require("../models/OrderItem");
const Orders = require("../models/Orders");
const Product = require("../models/Product");
const CartItem = require("../models/CartItem");

// Route để lấy danh sách các order items
router.get("/", async (req, res) => {
  try {
    const orderItems = await OrderItem.findAll({
      include: [
        { model: Orders, as: "order" },
        { model: Product, as: "product" },
      ],
    });
    res.json(orderItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route để lấy thông tin của một order item theo orderItemId
router.get("/:orderItemId", async (req, res) => {
  const { orderItemId } = req.params;
  try {
    const orderItem = await OrderItem.findByPk(orderItemId, {
      include: [
        { model: Orders, as: "order" },
        { model: Product, as: "product" },
      ],
    });
    if (!orderItem) {
      return res.status(404).json({ msg: "Order Item not found" });
    }
    res.json(orderItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route để tạo mới một order item
router.post("/", async (req, res) => {
  const { orderId, accountId, cartItemIds } = req.body;

  try {
    if (!orderId || !accountId || !cartItemIds || !Array.isArray(cartItemIds)) {
      return res
        .status(400)
        .json({ msg: "orderId, accountId and cartItemIds are required" });
    }

    // Truy xuất tất cả CartItem theo accountId và cartItemIds
    const cartItems = await CartItem.findAll({
      where: {
        accountId: accountId,
        cartItemId: cartItemIds,
      },
    });

    if (cartItems.length === 0) {
      return res.status(404).json({
        msg: "No CartItems found for the given accountId and cartItemIds",
      });
    }

    // Tạo các OrderItem từ các CartItem đã truy xuất
    const orderItems = await Promise.all(
      cartItems.map(async (cartItem) => {
        const { productId, quantity, totalPrice: price } = cartItem;

        const newOrderItem = await OrderItem.create({
          orderId,
          productId,
          quantity,
          price,
        });

        return newOrderItem;
      })
    );

    // Tính toán lại totalPrice từ orderItems
    const totalPrice = orderItems.reduce(
      (total, item) => total + item.price,
      0
    );

    // Cập nhật lại totalPrice của Order
    const order = await Orders.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    await order.update({ totalPrice });

    res.json(orderItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
