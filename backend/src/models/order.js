const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: { 
    type: String, 
    required: true 
  },
  customerAddress: { 
    type: String, 
    required: true 
  },
  customerPhoneNumber: { 
    type: String, 
    required: true 
  },
  product: { 
    type: String,
    required: true 
  },
  status: {
    type: String,
    enum: ['placed', 'confirmed', 'delivered'],
    default: 'placed',
  },
  price: {
    type: Number,
    required: true,
  },
  restaurantName: {
    type: String,
    required: true 
  },
  restaurantAddress: { 
    type: String, 
    required: true 
  },
  restaurantPhoneNumber: { 
    type: String, 
    required: true 
  },
  orderTime: { 
    type: Date, 
    default: Date.now 
  },
  restaurantEmail: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String,
    required: true
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
