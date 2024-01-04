const express = require("express");
const router = express.Router();
const controller = require("../controller/product.controller")
router.post("/sameProducts", controller.sameProducts )

module.exports = router;