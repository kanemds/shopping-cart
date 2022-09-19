const express = require('express')
const router = express.Router()
const { getRequest, putRequest } = require('../../controller/toServer/editController')
const multer = require('multer')


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


router.get('/:id', getRequest)
router.put('/:id', upload.single('image'), putRequest)


module.exports = router