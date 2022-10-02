require('dotenv').config()
const cloudinaryModule = require('cloudinary')

const cloudinary = cloudinaryModule.v2

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET,
})

module.exports = cloudinary