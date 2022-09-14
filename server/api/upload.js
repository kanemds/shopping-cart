const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path');
const Books = require('../models/book')
const fs = require('fs');

// 
const imgstorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req.file)
    cb(null, 'images/')
  },
  filename: (req, file, cb) => {
    console.log(req.file)
    // date first incase same file name
    cb(null, `${file.fieldname}-${Date.now()}`)
  }
})

// must store in object {storage: xxxxx}
const upload = multer({ storage: imgstorage })

router.get('/', (req, res) => {
  res.render('create')
})

router.get('/', (req, res) => {
  Books.find(), (error, items) => {
    if (error) {
      console.log(error)
      res.status(500).json('Error occured')
    } else {
      res.render('index', { items: items })
    }
  }
})

// sinlge means upload one at a time
// argument is the html input name

router.post('/', upload.single('image'), (req, res) => {
  const product = {
    name: req.body.name,
    desc: req.body.desc,
    img: req.file.filename
    // img: {
    //   data: fs.readFileSync(path.join(__dirname + '../../images/' + req.file.filename)),
    //   contentType: 'image/jpg'
    // }
  }
  Books.create(product, (error, item) => {
    if (error) {
      console.log(error)
    } else {
      res.redirect('/')
    }
  })

})

module.exports = router