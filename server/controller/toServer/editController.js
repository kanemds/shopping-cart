const Books = require('../../models/book')
const fs = require('fs')
const path = require('path')


const getRequest = (req, res) => {
  const id = req.params.id
  Books.findById(id)
    .then(product => {
      res.status(201).render('edit', { image: product })
    })
    .catch(error => {
      console.log(error)
      res.status(404).json(error.message)
    })
}

const putRequest = async (req, res) => {
  try {
    const updateBooks = await Books.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      desc: req.body.name,
      price: req.body.price,
      img: {
        data: fs.readFileSync(path.join(__dirname + '../../images/' + req.file.filename)),
        contentType: 'image/jpg'
      }
    })
    res.status(201).json(updateBooks)
    res.redirect('/products')
  } catch (error) {
    console.log(error.message)
    res.status(500).json(error.message)
  }
}




module.exports = { getRequest, putRequest }