const express = require('express')
const router = express.Router()
const { postRequest, getRequest, getProductByIdRequest, deleteRequest, putRequest } = require('../../controller/toClient/productsController')
const { isAdmin } = require('../middleware/auth')


router.get('/', getRequest)
router.get('/find/:id', getProductByIdRequest)
router.post('/', isAdmin, postRequest)
router.put('/:id', putRequest)
router.delete('/:id', deleteRequest)



module.exports = router