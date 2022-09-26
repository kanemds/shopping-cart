const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  customerId: {
    type: String
  },
  paymentId: {
    type: String
  },
  products: [],

  subtotal: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  shipping: {
    type: Object,
    required: true
  },
  delivery_status: {
    type: String,
    default: "pending"
  },
  payment_status: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }

})

module.exports = mongoose.model('Order', orderSchema)