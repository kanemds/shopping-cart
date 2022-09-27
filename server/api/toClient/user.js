const router = require('express').Router()
const { getRequest } = require('../../controller/toClient/userController')

router.get('/', getRequest)

module.exports = router