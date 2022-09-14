const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  name: String,
  desc: String,
  price: Number,
  img: {
    // Buffer: allow store img data type 
    data: Buffer,
    contentType: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Book', bookSchema)