const express = require('express')
const router = express.Router()
const allProducts = require('./toServer/allProducts')
const upload = require('./toServer/upload')
const edit = require('./toServer/edit')
const showProducts = require('./toClient/showProducts')
const register = require('./toClient/register')
const login = require('./toClient/login')
const stripe = require('./toServer/stripe')
const products = require('./toClient/products')
const user = require('./toClient/user')
const order = require('./toClient/order')
const fileUpload = require('./middleware/fileUpload')

// server
router.use('/upload', upload)
router.use('/edit', edit)
router.use('/products', allProducts)
router.use('/stripe', stripe)
router.use('/user', user)

// client
router.use('/fileupload', fileUpload)
router.use('/order', order)
router.use('/register', register)
router.use('/login', login)
router.use('/product', products)
router.use('/', showProducts)

module.exports = router