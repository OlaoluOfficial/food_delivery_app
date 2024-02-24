const mongoose = require('mongoose');

const productSchema = new Schema({
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
  productPictures: [String],

},
{ timestamps: true }
);

const Product = model('Product', productSchema);

module.exports = Product;
