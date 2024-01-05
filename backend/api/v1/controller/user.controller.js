//[POST] /api/v1/users/register
const User = require("../models/user.model");
const { format } = require("date-fns");
const ForgotPassword = require("../models/forgot-password.model");
const generateHelper = require("../../../helpers/generate");
const sendMailHelper = require("../../../helpers/sendMail");
const checkInformationHelper = require("../../../helpers/checkInformation");
// [post] /api/v1/password/forgot
module.exports.forgotPassword = async (req, res) => {
  const username = req.body.username;
  const sendAgain = req.body.sendAgain;
  const user = await User.findOne({
    username: username,
    deleted: false,
    status: "active",
  });

  if (!user) {
    res.json({
      code: 400,
      message: "Username Không tồn tại!",
    });
    return;
  } else {
    if (!user.email) {
      res.json({
        code: 400,
        message: "Bạn không điền đầy đủ thông tin cá nhân.",
      });
      return;
    }
  }

  const otp = generateHelper.generateRandomNumber(8);
  const timeExpire = 5;

  const objectForgotPassword = {
    username: username,
    email: user.email,
    otp: otp,
    expireAt: Date.now() + timeExpire * (1000 * 60),
  };

  if(sendAgain){
   await ForgotPassword.updateOne({
      username: username
    }, {
      otp: otp
    })
  }
  else {
    const forgotPassword = new ForgotPassword(objectForgotPassword);
  await forgotPassword.save();
  }
  

  // gửi email
  const subject = `Mã OTP ĐỂ XÁC MINH LẤY LẠI MẬT KHẨU`;
  const html = `Mã OTP ĐỂ XÁC MINH LẤY LẠI MẬT KHẨU LÀ <b>${otp}</b>. Thời hạn sử dụng: ${timeExpire} phút . Lưu ý không được để lộ OTP `;
  sendMailHelper.sendMail(user.email, subject, html);
  // end gửi email

  res.json({
    code: 200,
    message: "Đã gửi mã otp qua email!",
    email: user.email,
  });
};
// [post] /api/v1/password/otp
module.exports.otpPassword = async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const otp = req.body.otp;

  const result = await ForgotPassword.findOne({
    email: email,
    username: username,
    otp: otp,
  });

  if (!result) {
    res.json({
      code: 400,
      message: "Mã OTP không hợp lệ",
    });
    return;
  }

  const user = await User.findOne({
    username: username,
    email: email,
  });

  const token = user.token;
  res.cookie("token", token);

  res.json({
    code: 200,
    message: "Xác thực thành công",
    token: token,
  });
};
// [post] /api/v1/password/reset
module.exports.resetPassword = async (req, res) => {
  const token = req.body.token;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword
  const data = req.body;
  const user = await User.findOne({
    token: token,
  });

  if(user && user.deleted === false){
    if (Object.keys(data).length === 3) {
      if (
        checkInformationHelper.checkPassword(password) === true &&
        checkInformationHelper.checkPassword(confirmPassword) === true 
      ) {
        if (password === user.password) {
          res.json({
            code: 400,
            message: "Vui lòng nhập mật khẩu mới khác mật khẩu cũ",
          });
        } else {
          if (confirmPassword !== password) {
            res.json({
              code: 400,
              message: "Mật khẩu xác nhận khác với mật khẩu mới",
            });
          } else {
            await User.updateOne(
              {
                _id: user._id
              },
              {
                password: password,
              }
            );
            res.json({
              code: 200,
              message: "Đã cập nhật mật khẩu thành công",
            });
          }
        }
      } else {
        res.json({
          code: 400,
          message: "Dữ Liệu Đầu Vào Không Đúng Định Dạng",
        });
      }
    } else {
      res.json({
        code: 400,
        message: "Chưa Điền Thông Tin Mật Khẩu",
      });
    }
  } else {
    res.json({
      code: 400,
      message: "Tài khoản Này Không Tồn Tại"
    })
  }
 

};
// [get] /password/email?username=
module.exports.emailPassword = async (req, res) => {
  const username = req.query.username;
  const email = await User.findOne({
    username: username,
    deleted: false,
    status: "active",
  }).select("email");
  if (!email) {
    res.json({
      code: 400,
      message: "Không tìm thấy thông tin người dùng.",
    });
    return;
  }

  res.json({
    code: 200,
    email: email.email,
  });
};

// [get] /information/myInfor
module.exports.myInfor = async (req, res) => {
  const user = req.user;
  const fullName = req.user.fullName;
  const email = req.user.email;
  const phoneNumber = req.user.phoneNumber;
  const gender = req.user.gender;

  res.json({
    code: 200,
    fullName: fullName,
    email: email,
    phoneNumber: phoneNumber,
    gender: gender,
  });
};

// [post] /information/inforExist
module.exports.inforExist = async (req, res) => {
  const user = req.user;
  const email = req.body.email;
  const phoneNumber = req.body.phoneNumber;

  const userExist = await User.findOne({
    _id: { $ne: user._id },
    $or: [{ email: email }, { phoneNumber: phoneNumber }],
  });

  if (userExist) {
    res.json({
      code: 400,
      message: "Thông tin cá nhân đã tồn tại. Vui lòng thử lại!",
    });
    return;
  }

  res.json({
    code: 200,
    message: "Thông tin không trùng lặp",
  });
};

// [patch]  /information/myInforPatch
module.exports.myInforPatch = async (req, res) => {
  const user = req.user;
  const data = req.body;
  await User.updateOne(
    {
      _id: user._id,
    },
    data
  );

  res.json({
    code: 200,
  });
};

// [post]  /login/checkLogin
module.exports.checkLogin = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const userExist = await User.findOne({
    username: username,
    password: password,
  });

  if (!userExist) {
    res.json({
      code: 400,
      message: "Tài Khoản Không Tồn Tại",
    });
  } else {
    if (userExist.deleted === false) {
      if (userExist.type === "admin") {
        res.json({
          code: 200,
          type: "admin",
          token: userExist.token,
          id: userExist._id,
        });
      } else {
        res.json({
          code: 200,
          type: "user",
          token: userExist.token,
          id: userExist._id,
        });
      }
    } else {
      res.json({
        code: 400,
        message: "Tài Khoản Đã Bị Khóa",
      });
    }
  }
};

// [post] /register/checkRegister
module.exports.checkRegister = async (req, res) => {
  const data = req.body;
  const confirmPassword = req.body.confirmPassword;
  const password = req.body.password;
  const username = req.body.username;
  if (data) {
    if (
      checkInformationHelper.checkPassword(password) === true &&
      checkInformationHelper.checkUsername(username) === true &&
      confirmPassword === password
    ) {
      const token = generateHelper.generateRandomString(20);
      const userExist = await User.findOne({
        $or: [
          {
            username: username,
          },
          {
            token: token,
          },
        ],
      });
      if (!userExist) {
        const user = new User({
          username: username,
          password: password,
          token: token,
          type: "user",
          deleted: false,
          status: "active",
          date: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        });
        await user.save();
        const userToken = user.token;
        res.json({
          code: 200,
          message: "Đã Đăng Kí Thành Công",
          token: userToken,
          user: user._id,
        });
      } else {
        res.json({
          code: 400,
          message: "Username Đã Được Sử Dụng. Vui Lòng Thử Lại!",
        });
      }
    } else {
      res.json({
        code: 400,
        message: "Dữ Liệu Đầu Vào Không Đúng Định Dạng",
      });
    }
  } else {
    res.json({
      code: 400,
      message: "Chưa Điền Thông Tin Đăng Kí",
    });
  }
};

// [get] /information/myUser
module.exports.myUser = async (req, res) => {
  const user = req.user;
  const username = req.user.username;
  const avatar = req.user.avatar ? req.user.avatar : "";
  res.json({
    code: 200,
    username: username,
    id: user._id,
    type: user.type,
    avatar: avatar,
    email: user.email,
  });
};

// [get] /information/allUsers
module.exports.allUsers = async (req, res) => {
  const user = await User.find({}).select("-password -token");

  res.json({
    code: 200,
    user: user,
  });
};

// [patch] /information/adminUsersPatch
module.exports.adminUsersPatch = async (req, res) => {
  const user = req.body;
  await User.updateOne(
    {
      _id: user._id,
    },
    user
  );
  res.json({
    code: 200,
    user: user,
  });
};

// [post] /information/adminUsersPost
module.exports.adminUsersPost = async (req, res) => {
  const data = req.body;
  const password = req.body.password;
  const username = req.body.username;
  const type = req.body.type;
  if (Object.keys(data).length === 3) {
    if (
      checkInformationHelper.checkPassword(password) === true &&
      checkInformationHelper.checkUsername(username) === true
    ) {
      const token = generateHelper.generateRandomString(20);
      const userExist = await User.findOne({
        $or: [
          {
            username: username,
          },
          {
            token: token,
          },
        ],
      });
      if (!userExist) {
        const user = new User({
          username: username,
          password: password,
          token: token,
          type: type,
          deleted: false,
          status: "active",
          date: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        });
        await user.save();
        const dataUser = await User.findOne({
          username: username,
          type: type,
          deleted: false,
          status: "active",
        }).select("-password -token");
        res.json({
          code: 200,
          message: "Đã Thêm Mới Người Dùng Thành Công",
          dataUser: dataUser,
        });
      } else {
        res.json({
          code: 400,
          message: "Username Đã Được Sử Dụng. Vui Lòng Thử Lại!",
        });
      }
    } else {
      res.json({
        code: 400,
        message: "Dữ Liệu Đầu Vào Không Đúng Định Dạng",
      });
    }
  } else {
    res.json({
      code: 400,
      message: "Chưa Điền Thông Tin Đăng Kí",
    });
  }
};

//[delete] /information/adminUsersDel/:id
module.exports.adminUsersDel = async (req, res) => {
  const id = req.params.id;
  const result = await User.deleteOne({
    _id: id,
  });
  if (id) {
    res.json({
      code: 200,
      message: "Đã Xóa Thành Công",
    });
  } else {
    res.json({
      code: 400,
      message: "Không thể xóa!",
    });
  }
};

//[get] /information/countUsers
module.exports.countUsers = async (req, res) => {
  const quantity = await User.countDocuments({
    deleted: false,
  });
  if (quantity >= 0) {
    res.json({
      code: 200,
      quantity: quantity,
    });
  } else {
    res.json({
      code: 400,
      message: "Số lượng không được âm",
    });
  }
};

// [post] /information/changePass
module.exports.changePass = async (req, res) => {
  const user = req.user;
  const data = req.body;
  const newPassword = req.body.newPassword;
  const oldPassword = req.body.oldPassword;
  const confirmNewPassword = req.body.confirmNewPassword;
  if (data) {
    if (
      checkInformationHelper.checkPassword(newPassword) === true &&
      checkInformationHelper.checkPassword(oldPassword) === true &&
      confirmNewPassword === newPassword &&
      checkInformationHelper.checkPassword(confirmNewPassword) === true
    ) {
      if (oldPassword === newPassword) {
        res.json({
          code: 400,
          message: "Không được nhập mật khẩu cũ trùng với mật khẩu mới",
        });
      } else {
        if (oldPassword === user.password) {
          const result = await User.updateOne(
            {
              _id: user._id,
            },
            {
              password: newPassword,
            }
          );
          res.json({
            code: 200,
            message: "Đã cập nhật mật khẩu thành công",
          });
        } else {
          res.json({
            code: 400,
            message: "Nhập mật khẩu cũ không đúng",
          });
        }
      }
    } else {
      res.json({
        code: 400,
        message: "Dữ Liệu Đầu Vào Không Đúng Định Dạng",
      });
    }
  } else {
    res.json({
      code: 400,
      message: "Chưa Điền Thông Tin Đăng Kí",
    });
  }
};

// [get] /information/avatar/:cookies
module.exports.avatar = async (req, res) => {
  const avatar = req.body.avatar;
  const cookies = req.params.cookies;
  const user = await User.findOne({
    token: cookies,
    deleted: false,
    status: "active",
  }).select("-password");
  if (avatar) {
    const result = await User.updateOne(
      {
        _id: user._id,
      },
      {
        avatar: avatar,
      }
    );
    res.json({
      code: 200,
      avatar: avatar,
      message: "Upload ảnh thành công",
    });
  } else {
    res.json({
      code: 400,
      message: "Upload ảnh không thành công",
    });
  }
};

// [delete] /information/removeAvatar
module.exports.removeAvatar = async (req, res) => {
  const user = req.user;
  if (!user) {
    res.json({
      code: 400,
      message: "Không thể xóa",
    });
    return;
  }
  const result = await User.updateOne(
    
    {
      _id: user._id,
    },
    {
      $unset: { avatar: "" },
    }
  );
  res.json({
    code: 200,
    message: "thành công",
  });
};
