const express = require('express')
const router = express.Router()
const books = require('./books')
const upload = require('./upload')
const edit = require('./edit')

router.use('/upload', upload)
router.use('/edit', edit)
router.use('/', books)



module.exports = router