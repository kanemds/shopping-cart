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

// server
router.use('/upload', upload)
router.use('/edit', edit)
router.use('/products', allProducts)
router.use('/stripe', stripe)
router.use('/user', user)
// client

router.use('/register', register)
router.use('/login', login)
router.use('/product', products)
router.use('/', showProducts)

module.exports = router