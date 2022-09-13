const express = require('express')
const router = express.Router()
const books = require('./books')
const upload = require('./upload')

router.use('/upload', upload)
router.use('/', books)



module.exports = router