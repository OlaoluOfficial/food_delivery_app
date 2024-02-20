const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  description: {
    type: string
  },
  price: { 
    type: Number, 
    required: true 
  },
  restaurant: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Restaurant', 
    required: true 
  },
});

const Product = model('Product', productSchema);

module.exports = Product;
