const express = require('express')
const router = express.Router()
const { getRequest, getEarningRequest } = require('../../controller/toClient/orderController')
const { auth, isUser, isAdmin } = require('../middleware/auth')

router.get('/earning', isAdmin, getEarningRequest)
router.get('/', isAdmin, getRequest)

module.exports = router