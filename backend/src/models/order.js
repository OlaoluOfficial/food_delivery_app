const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer: {
    type: Object,
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      name: String,
      quantity: Number,
      price: Number,

      restaurant: {
        type: Object,
        required: true,
      },
    },
  ],
  status: {
    type: String,
    enum: ["placed", "confirmed", "delivered"],
    default: "placed",
  },
  orderTime: {
    type: Date,
    default: Date.now,
  },
  orderId: {
    type: String,
    required: true,
  },
  postman: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
