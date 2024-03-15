const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  products: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    name: String,
    quantity: Number,
    price: Number,
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant'
    }
  }],
  status: {
    type: String,
    enum: ['placed', 'confirmed', 'completed'],
    default: 'placed'
  },
  orderTime: {
    type: Date,
    default: Date.now,
  },
  postman: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
  }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
