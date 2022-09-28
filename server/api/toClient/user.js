const express = require('express')
const router = express.Router()

const { getRequest } = require('../../controller/toClient/userController')
const { auth, isUser, isAdmin } = require('../middleware/auth')

router.get('/', getRequest)

module.exports = router