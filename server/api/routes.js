const express = require('express')
const router = express.Router()
const allProducts = require('./toServer/allProducts')
const upload = require('./toServer/upload')
const edit = require('./toServer/edit')
const showProducts = require('./toClient/showProducts')

// server
router.use('/upload', upload)
router.use('/edit', edit)
router.use('/products', allProducts)

// client
router.use('/', showProducts)


module.exports = router