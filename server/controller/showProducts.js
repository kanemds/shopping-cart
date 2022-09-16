const Books = require('../models/book')

const getRequest = async (req, res) => {
  try {
    const all = await Books.find()
    res.status(201).json(all)
  } catch (error) {
    console.log(error.message)
    res.status(500).json(error.message)
  }
}

module.exports = { getRequest }