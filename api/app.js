// app.js
const sequelize = require("./db"); // Đường dẫn đến file db.js

// Import các mô hình
const SalesStaff = require("./models/SalesStaff");
const Customer = require("./models/Customer");
const Category = require("./models/Category");
const Product = require("./models/Product");
const Review = require("./models/Review");
const CartItem = require("./models/CartItem");
const TypePayment = require("./models/TypePayment");
const Orders = require("./models/Orders");
const OrderItem = require("./models/OrderItem");
const Coupon = require("./models/Coupon");
const Banner = require("./models/Banner");

// Định nghĩa quan hệ giữa các mô hình
Product.belongsTo(Category, { foreignKey: "cateId", as: "category" });
Category.hasMany(Product, { foreignKey: "cateId", as: "products" });

Review.belongsTo(Customer, { foreignKey: "accountId" });
Review.belongsTo(Product, { foreignKey: "productId" });
Customer.hasMany(Review, { foreignKey: "accountId" });
Product.hasMany(Review, { foreignKey: "productId" });

CartItem.belongsTo(Customer, { foreignKey: "accountId" });
Customer.hasOne(CartItem, { foreignKey: "accountId" });

CartItem.belongsTo(Product, { foreignKey: "productId" });
Product.hasMany(CartItem, { foreignKey: "productId" });

Orders.belongsTo(Customer, { foreignKey: "accountId" });
Orders.belongsTo(TypePayment, { foreignKey: "typePaymentId" });
Customer.hasMany(Orders, { foreignKey: "accountId" });
TypePayment.hasMany(Orders, { foreignKey: "typePaymentId" });

OrderItem.belongsTo(Orders, { foreignKey: "orderId" });
OrderItem.belongsTo(Product, { foreignKey: "productId" });
Orders.hasMany(OrderItem, { foreignKey: "orderId" });
Product.hasMany(OrderItem, { foreignKey: "productId" });

// Hàm khởi tạo cơ sở dữ liệu và đồng bộ mô hình
async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // Đồng bộ hóa các mô hình với cơ sở dữ liệu
    await sequelize.sync({ force: false }); // Sử dụng force: true để xoá và tạo lại bảng

    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

initializeDatabase();

// Export sequelize để sử dụng trong server.js
module.exports = sequelize;
