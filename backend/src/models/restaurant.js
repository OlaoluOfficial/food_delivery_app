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
    location: {
      type: String,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      default: "123456789",
    },
    registeredBy: {
      type: String,
      default: "admin",
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
  },
  {
    timestamps: true,
  }
);

const Restaurant = model("Restaurant", restaurantSchema);

module.exports = Restaurant;
