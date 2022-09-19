const express = require('express')
const router = express.Router()
const { postRequest } = require('../../controller/toClient/loginController')

router.post('/', postRequest)

module.exports = router