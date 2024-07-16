const express = require("express");
const router = express.Router();
const CartItem = require("../models/CartItem");
const Product = require("../models/Product");

// Route để lấy danh sách CartItem
router.get("/", async (req, res) => {
  try {
    const cartItems = await CartItem.findAll();
    res.json(cartItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//Route để lấy danh sách giỏ hàng theo id tài khoản
router.get("/:accountId", async (req, res) => {
  const { accountId } = req.params;

  try {
    // Tìm các CartItem dựa trên accountId
    const cartItems = await CartItem.findAll({
      where: {
        accountId: accountId,
      },
      include: {
        model: Product,
        attributes: ["productId", "productName", "price", "img"], // Chỉ lấy các trường cần thiết từ Product
      },
    });

    res.json(cartItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route để tạo mới CartItem
router.post("/", async (req, res) => {
  const { accountId, productId, quantity } = req.body;
  try {
    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng của tài khoản hay chưa
    let cartItem = await CartItem.findOne({
      where: {
        accountId: accountId,
        productId: productId,
      },
    });

    if (cartItem) {
      // Nếu sản phẩm đã tồn tại trong giỏ hàng của tài khoản, cập nhật số lượng và total price
      const newQuantity = cartItem.quantity + quantity;
      const newTotalPrice = newQuantity * cartItem.price;

      await cartItem.update({
        quantity: newQuantity,
        totalPrice: newTotalPrice,
      });

      res.json(cartItem);
    } else {
      // Nếu sản phẩm chưa tồn tại trong giỏ hàng của tài khoản, tạo mới CartItem
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ msg: "Product not found" });
      }

      const price = product.price;
      const totalPrice = quantity * price;

      const newCartItem = await CartItem.create({
        accountId,
        productId,
        quantity,
        price,
        totalPrice,
      });

      res.json(newCartItem);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Cập nhật số lượng sản phẩm trong giỏ hàng
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { accountId, productId, quantity } = req.body;

  try {
    const cartItem = await CartItem.findByPk(id);
    if (!cartItem) {
      return res.status(404).json({ msg: "CartItem not found" });
    }

    // Fetch product price from Product model
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    // Calculate new price and total price based on updated quantity
    const price = product.price;
    const totalPrice = quantity * price;

    // Update cart item with new values
    await cartItem.update({
      accountId,
      productId,
      quantity,
      price,
      totalPrice,
    });

    res.json({ msg: "CartItem updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route để xóa CartItem
router.delete("/:accountId/:cartItemId", async (req, res) => {
  const { accountId, cartItemId } = req.params;

  try {
    const cartItem = await CartItem.findOne({
      where: {
        cartItemId: cartItemId,
        accountId: accountId,
      },
    });

    if (!cartItem) {
      return res.status(404).json({ msg: "CartItem not found" });
    }

    await cartItem.destroy();
    res.json({ msg: "CartItem deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
