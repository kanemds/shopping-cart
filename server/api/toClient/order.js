const express = require('express')
const router = express.Router()
const { getRequest, getEarningRequest, getWeeklyRequest } = require('../../controller/toClient/orderController')
const { auth, isUser, isAdmin } = require('../middleware/auth')

router.get('/earning', isAdmin, getEarningRequest)
router.get('/weekly-sales', getWeeklyRequest)
router.get('/', isAdmin, getRequest)


module.exports = router