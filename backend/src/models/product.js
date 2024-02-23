const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  description: {
    type: String
  },
  price: { 
    type: Number, 
    required: true 
  },
  minimumPrice: {
    type: Number,
    required: true
  },
  restaurant: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Restaurant', 
    required: true 
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
