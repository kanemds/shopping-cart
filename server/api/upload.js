const express = require('express')
const router = express.Router()
const multer = require('multer')
const { getRequest, postRequest } = require('../controller/uploadController')


const imgstorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/')
  },
  filename: (req, file, cb) => {
    // date first incase same file name
    cb(null, `${file.originalname}-${Date.now()}`)
  }
})

// must store in object {storage: xxxxx}
const upload = multer({ storage: imgstorage })

router.get('/', getRequest)


// sinlge means upload one at a time
// argument is the html input name

router.post('/', upload.single('image'), postRequest)

module.exports = router