const express = require('express')
const router = express.Router()
const { postRequest } = require('../../controller/toClient/registerController')

router.post('/', postRequest)


module.exports = router