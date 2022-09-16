const express = require('express')
const router = express.Router()
const { getRequest } = require('../../controller/showProducts')

router.get('/', getRequest)

module.exports = router