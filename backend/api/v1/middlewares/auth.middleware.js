const User = require("../models/user.model")

module.exports.requireAuth = async (req, res, next) => {
  if(req.headers.authorization){
      const token = req.headers.authorization.split(" ")[1];
    const user = await User.findOne({
      token: token,
      deleted: false
    }).select("-password");
if(!user){
  res.json({
    code: 400,
    message: "token Không hợp lệ!"
  });
  return;
}

req.user = user;

next();
  } else {
    res.json({
      code: 400,
      message: "Vui lòng gửi kèm token!"
    })
  }
}

module.exports.adminPemission = async(req, res, next) => {
  if(req.headers.authorization){
    const token = req.headers.authorization.split(" ")[1];
const user = await User.findOne({
  deleted: false,
  status: "active",
  token: token
}).select("-password");
if(user){
  if(user.type === "admin"){
  next();
}
else {
  res.json({
    code: 400,
    message: "Chỉ có admin lấy dữ liệu này được"
  })
}
}
else {
  res.json({
    code: 400,
    message: "Người dùng đã bị khóa"
  })
}
  }
  else {
    res.json({
      code: 400,
      message: "Vui lòng gửi kèm token!"
    })
  }
}

module.exports.changePassword = async (req, res, next) => {
  if(req.headers.authorization){
      const token = req.headers.authorization.split(" ")[1];
    const user = await User.findOne({
      token: token,
      deleted: false
    });
if(!user){
  res.json({
    code: 400,
    message: "token Không hợp lệ!"
  });
  return;
}

req.user = user;

next();
  } else {
    res.json({
      code: 400,
      message: "Vui lòng gửi kèm token!"
    })
  }
}