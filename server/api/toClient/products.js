const express = require('express')
const router = express.Router()
const { postRequest, getRequest } = require('../../controller/toClient/productsController')

router.get('/', getRequest)
router.post('/', postRequest)

module.exports = router