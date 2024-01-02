const userRoutes = require("./user.route")
const authMiddleware = require("../middlewares/auth.middleware")
  module.exports = (app) => {
   const version = "/api/v1"
    app.use( version + '/users', userRoutes);
 
  }