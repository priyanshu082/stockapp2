const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/stock_app");
const userSchema = new mongoose.Schema({
  name:String,
  email:String,
  password:String,
  mobile:Number,
  isSubscribed:Boolean,
  SubscriptionType:Number
});
const User = mongoose.model('User',userSchema);

module.exports = {
  User
};