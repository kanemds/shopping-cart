const express = require('express')
const router = express.Router()

const { getRequest } = require('../../controller/toServer/booksController')


router.get('/', getRequest)




module.exports = router