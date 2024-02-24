const { Schema, model, default: mongoose } = require('mongoose');

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
  },
  registeredBy: {
    type: String,
    default:'admin'
    }
},
{
  timestamps: true // Automatically add createdAt and updatedAt properties
}
);

const Restaurant = model('Restaurant', restaurantSchema);

module.exports = Restaurant;
