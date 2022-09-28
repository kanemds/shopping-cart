const express = require('express')
const router = express.Router()
const { getRequest } = require('../../controller/toClient/orderController')
const { auth, isUser, isAdmin } = require('../middleware/auth')


router.get('/', isAdmin, getRequest)

module.exports = router