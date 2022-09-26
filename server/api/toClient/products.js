const express = require('express')
const router = express.Router()
const { postRequest, getRequest } = require('../../controller/toClient/productsController')
const { isAdmin } = require('../middleware/auth')

router.get('/', getRequest)
router.post('/', isAdmin, postRequest)

module.exports = router