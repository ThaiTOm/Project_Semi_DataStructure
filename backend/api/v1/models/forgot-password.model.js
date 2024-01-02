const mongoose = require("mongoose");
const forgotPasswordSchema = new mongoose.Schema({
username: String,
email: String,
otp: String,
expireAt: {
  type: Date,
  expires: 0
}
}, {
  timestamps: true // thời gian tạo và cập nhật
});

const ForgotPassword = mongoose.model("ForgotPassword", forgotPasswordSchema, "forgot-password"); 

module.exports = ForgotPassword;  
