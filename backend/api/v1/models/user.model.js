const mongoose = require("mongoose");
const generate = require("../../../helpers/generate")
const userSchema = new mongoose.Schema({
    
username: String,
type: String,
password: String,
token: String, 
fullName: String,
email: String,
phoneNumber: String,
gender: String,
avatar: String,
status: String,
date: String,
deleted: {
  type: Boolean,
  default: false
},
deletedAt: Date
});

const User = mongoose.model("User", userSchema, "users"); 

module.exports = User;  
