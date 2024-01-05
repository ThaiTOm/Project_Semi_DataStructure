// [get] /product/sameProducts
const fs = require('fs');

module.exports.sameProducts = async (req, res) => {
  const productId = req.body.productId;
  try {
    let recommend = [];
    fs.readFile('D:/Lập Trình ST/web/Dự_án_3Tstore/backend/config/arr.txt', 'utf8', function(err, data) {
      if (err) {
        console.error(err);
        return res.status(500).json({ code: 500, message: 'Internal Server Error' });
      }
      let array = data.split('\n').map(line => line.split(' ').map(Number));
      const productID = productId;
      let index = 0;
      let mophong = [1, 35, 46, 39];
      for (const item of array[productID]) {
        if (item > 0.8) {
          recommend.push(index + 1);
        }
        index += 1;
      }

      recommend.sort(function(a, b) {
        return b - a;
      });
      res.json({
        code: 200,
        recommend: recommend.slice(0, 3).concat(mophong.slice(0, 2))
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, message: 'Internal Server Error' });
  }
};
