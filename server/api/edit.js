const express = require('express')
const router = express.Router()
const { getRequest, putRequest } = require('../controller/editController')


router.get('/:id', getRequest)
// router.put('/:id', putRequest)

module.exports = router