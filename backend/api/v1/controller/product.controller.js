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
      for (const item of array[productID]) {
        if (item > 0.95) {
          recommend.push(index + 1);
        }
        else if (recommend.length >= 10){
          break;
        }
        index += 1;
      }

      res.json({
        code: 200,
        recommend: recommend
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, message: 'Internal Server Error' });
  }
};
