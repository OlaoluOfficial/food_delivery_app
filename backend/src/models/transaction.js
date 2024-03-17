const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  products: { 
    type: String,
    required: true 
  },
  status: { 
    type: String,
    enum: ['pending', 'successful', 'failed'],
    default: 'pending'
  },
  txRef: {
    type: String,
    required: true,
    unique: true
  },
  cart: {
    type: String,
    required: true
  }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;