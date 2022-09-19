const express = require('express')
const router = express.Router()
const { postRequest } = require('../../controller/toClient/registerController')

router.post('register', postRequest)


module.exports = router