const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

// cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});
// end cloudinary

// hàm tạo chuỗi thông tin xử lí ảnh
let streamUpload = (buffer) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });
    streamifier.createReadStream(buffer).pipe(stream);
  });
};
// kết thúc hàm tạo chuỗi thông tin xử lí ảnh

// hàm lấy url của ảnh
module.exports.uploadToCloudinary = async (buffer) => {
  let result = await streamUpload(buffer);
  return result.url;
};
// kết thúc hàm lấy url của ảnh
