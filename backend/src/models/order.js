const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
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
  restaurant: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Restaurant', 
    required: true 
  },
  orderTime: { 
    type: Date, 
    default: Date.now 
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
