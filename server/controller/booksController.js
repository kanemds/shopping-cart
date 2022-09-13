const Books = require('../models/book')

const getRequest = async (req, res) => {
  try {
    const all = await Books.find()
    res.status(201).json(all)
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message)
  }
}

const postRequest = async (req, res) => {
  try {

  } catch (error) {

  }
}


module.exports = { getRequest, postRequest }