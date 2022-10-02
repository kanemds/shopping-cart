const express = require('express')
const router = express.Router()

const { getRequest, getAllRequest, deleteRequest, findOneRequest } = require('../../controller/toClient/userController')
const { auth, isUser, isAdmin } = require('../middleware/auth')

router.get('/', isAdmin, getRequest)
router.get('/all', isAdmin, getAllRequest)
router.get('/find/:id', isUser, findOneRequest)
router.delete('/:id', isAdmin, deleteRequest)

module.exports = router