const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["customer", "restaurant", "admin", "delivery"],
      default: "customer",
    },
    address: {
      type: String,
    },
    token: String,
    resetPasswordExpires: Date ,
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
