const express = require('express')
const router = express.Router()
const { getRequest } = require('../../controller/toClient/showProducts')

router.get('/', getRequest)

module.exports = router