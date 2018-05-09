const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  phone: String,
  password: String,
  email : String,
  role : {type:String, enum: ['Admin', "Developer", "Client"], default: "Client"}
});

const User = mongoose.model('User', userSchema);


module.exports = User;

