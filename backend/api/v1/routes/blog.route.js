const express = require("express");
const router = express.Router();
const controller = require("../controller/blog.controller")
const authMiddleware = require("../middlewares/auth.middleware")
router.get("/getBlogs", authMiddleware.adminPemission, controller.getBlogs)
router.post("/postBlogs", authMiddleware.adminPemission, controller.postBlogs)
router.get("/getBlogId/:id", controller.getBlogId)
router.patch("/patchBlogId/:id", authMiddleware.adminPemission, controller.patchBlogId)
router.delete("/delBlogId/:id",  authMiddleware.adminPemission, controller.delBlogId)
router.post("/getBlogs/category", controller.getBlogCate)

module.exports = router; 