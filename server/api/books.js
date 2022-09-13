const express = require('express')
const router = express.Router()

const { getRequest, postRequest } = require('../controller/booksController')


router.post('/')

router.get('/', getRequest)




module.exports = router