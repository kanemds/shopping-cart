const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')

// 
const imgstorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req.file)
    cb(null, 'images/')
  },
  filename: (req, file, cb) => {
    console.log(req.file)
    // date first incase same file name
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

// must store in object {storage: xxxxx}
const upload = multer({ storage: imgstorage })

router.get('/', (req, res) => {
  res.render('index')
})

// sinlge means upload one at a time
// argument is the html input name

router.post('/', upload.single('images'), (req, res) => {
  res.send('image uploaded')

})

module.exports = router