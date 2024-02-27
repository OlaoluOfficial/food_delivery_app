const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    require: true,
    
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  phone: { 
    type: String, 
    required: true, 
    unique: true 
  },
  role: { 
    type: String, 
    enum: ['customer', 'restaurant', 'admin', 'delivery'], 
    required: true 
  },
  registrationNo:{
    type: String, 
    default:""
  }
},
{
  timestamps: true 
});

const User = model('User', userSchema);

module.exports = User;
