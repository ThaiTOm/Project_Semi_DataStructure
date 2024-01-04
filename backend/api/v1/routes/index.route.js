const userRoutes = require("./user.route")
const productRoutes = require("./product.route")
const blogRoutes = require("./blog.route")

  module.exports = (app) => {
   const version = "/api/v1"
    app.use( version + '/users', userRoutes);
    app.use(version + '/products', productRoutes )
    app.use(version + '/blogs', blogRoutes )
  }