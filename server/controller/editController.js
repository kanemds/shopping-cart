const Books = require('../models/book')


const getRequest = (req, res) => {
  try {
    res.status(201).render('edit')
  } catch (error) {
    console.log(error)
    res.status(404).json(error.message)
  }
}



const putRequest = async (req, res) => {

  const { name, desc, price, img } = req.body

  try {
    const updateBooks = await Books.findByIdAndUpdate(req.params.id, { name, desc, price, img }, { new: true })
    res.status(201).json(updateBooks)
  } catch (error) {
    console.log(error.message)
    res.status(500).json(error.message)
  }
}


module.exports = { getRequest, putRequest }