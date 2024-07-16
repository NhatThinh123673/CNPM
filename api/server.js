// server.js
const express = require("express");
const app = express();
const sequelize = require("./app"); // Đường dẫn đến file app.js (chứa đối tượng sequelize và khai báo quan hệ)

const productRoutes = require("./routes/products");
const categoryRoutes = require("./routes/categories");
const cart = require("./routes/cart");
const customer = require("./routes/customers");
const order = require("./routes/orders");
const orderItem = require("./routes/orderItems");
const coupon = require("./routes/coupons");
const staff = require("./routes/staff");

// Middleware để cho phép nhận dữ liệu JSON từ client
app.use(express.json());

// Sử dụng route của products và categories
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/cart", cart);
app.use("/customer", customer);
app.use("/order", order);
app.use("/orderitem", orderItem);
app.use("/coupon", coupon);
app.use("/staff", staff);

// Kết nối tới cơ sở dữ liệu MySQL
sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => console.log(err));
