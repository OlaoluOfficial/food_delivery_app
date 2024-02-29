const { Schema, model, default: mongoose } = require("mongoose");

const restaurantSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    registeredBy: {
      type: String,
      default: "admin",
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt properties
  }
);

const Restaurant = model("Restaurant", restaurantSchema);

module.exports = Restaurant;
