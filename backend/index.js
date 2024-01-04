const express = require("express");
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const database = require("./config/database") // gán database
require("dotenv").config();  // kết nối với env (tải thư viên dotenv)
const routeApiVer1 = require("./api/v1/routes/index.route")
const app = express();
const port = process.env.PORT; // cách để lấy biến ở env 

app.use(cors());
database.connect(); // kết nối với database ở file config
app.use(cookieParser());


// parse application/json
app.use(bodyParser.json())

// router Version 1
routeApiVer1(app); // kết nối với index router (truyền app)

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});