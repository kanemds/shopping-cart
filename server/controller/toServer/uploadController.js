const path = require('path');
const Books = require('../../models/book')
const fs = require('fs');


const getRequest = (req, res) => {
  try {
    res.status(201).render('create')
  } catch (error) {
    console.log(error)
    res.status(404).json(error.message)
  }
}

const postRequest = (req, res) => {
  const product = {
    name: req.body.name,
    desc: req.body.desc,
    price: req.body.price,
    img: {
      data: fs.readFileSync(path.join(__dirname + '../../../images/' + req.file.filename)),
      contentType: 'image/jpg'
    }
  }
  Books.create(product, (error, item) => {
    if (error) {
      console.log(error)
    } else {
      res.redirect('/products')
    }
  })
}

module.exports = { getRequest, postRequest }