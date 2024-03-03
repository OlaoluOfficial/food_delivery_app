const { Schema, model, default: mongoose } = require("mongoose");

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
  phoneNumber: {
    type: String,
    required: true
  },
  registeredBy: {
    type: String,
    default:'admin'
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
},
{
  timestamps: true // Automatically add createdAt and updatedAt properties
}
);

const Restaurant = model("Restaurant", restaurantSchema);

module.exports = Restaurant;
