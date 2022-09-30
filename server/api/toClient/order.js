const express = require('express')
const router = express.Router()
const { getRequest, getEarningRequest, getWeeklyRequest, getLastRequest, putRequest } = require('../../controller/toClient/orderController')
const { auth, isUser, isAdmin } = require('../middleware/auth')

router.get('/earning', isAdmin, getEarningRequest)
router.get('/weekly-sales', isAdmin, getWeeklyRequest)
router.get('/overview', isAdmin, getRequest)
router.get('/translists', isAdmin, getLastRequest)
router.put('/:id', isAdmin, putRequest)

module.exports = router