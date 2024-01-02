const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const controller = require("../controller/user.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const uploadCloud = require("../middlewares/uploadCloud.middleware");

router.post("/password/forgot", controller.forgotPassword);
router.post("/password/otp", controller.otpPassword);
router.post("/password/reset", controller.resetPassword);
router.get("/password/email", controller.emailPassword);
router.get("/information/myInfor", authMiddleware.requireAuth, controller.myInfor);
router.post("/information/inforExist", authMiddleware.requireAuth, controller.inforExist);
router.patch("/information/myInforPatch", authMiddleware.requireAuth, controller.myInforPatch);
router.post("/login/checkLogin", controller.checkLogin);
router.post("/register/checkRegister", controller.checkRegister);
router.get("/information/myUser", authMiddleware.requireAuth, controller.myUser);
router.get("/information/allUsers", authMiddleware.adminPemission, controller.allUsers)
router.patch("/information/adminUsersPatch", authMiddleware.adminPemission, controller.adminUsersPatch);
router.post("/information/adminUsersPost", authMiddleware.adminPemission, controller.adminUsersPost);
router.delete("/information/adminUsersDel/:id", authMiddleware.adminPemission, controller.adminUsersDel)
router.get("/information/countUsers", authMiddleware.adminPemission, controller.countUsers)
router.patch("/information/changePass", authMiddleware.changePassword, controller.changePass);
router.post("/information/avatar/:cookies",upload.single("avatar"), uploadCloud.upload  , controller.avatar)
router.delete("/information/removeAvatar", authMiddleware.requireAuth, controller.removeAvatar)
module.exports = router;