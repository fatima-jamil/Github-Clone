// const AWS = require("aws-sdk");

// AWS.config.update({ region: "ap-south-1" });

// const s3 = new AWS.S3();
// const S3_BUCKET = "insert_bucket_name";

// module.exports = { s3, S3_BUCKET };




const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_KEY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'folder',
      // allowedFormat: ['png','jpeg','jpg'] , // supports promises as well
    },
  });

  module.exports = {
    cloudinary,
    storage,
  }