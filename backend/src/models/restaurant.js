const { Schema, model } = require('mongoose');

const restaurantSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: {
    type: String
  },
  location: {
    type: String
  }
});

const Restaurant = model('Restaurant', restaurantSchema);

module.exports = Restaurant;
