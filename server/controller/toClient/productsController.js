const Product = require('../../models/product')

const { ref, deleteObject } = require("firebase/storage")
const { storage } = require('../../api/firebase')
const postRequest = async (req, res) => {
  const { name, author, desc, price, img } = req.body

  try {
    const product = new Product({
      name, author, desc, price, img
    })

    const saveProduct = await product.save()
    res.status(201).json(saveProduct)
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message)
  }
}

const getRequest = async (req, res) => {
  try {
    const products = await Product.find()
    res.status(201).json(products)
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message)
  }
}

const getProductByIdRequest = async (req, res) => {

  try {
    const product = await Product.findById(req.params.id)

    res.status(200).json(product)
  } catch (error) {
    res.status(500).json(error.message)
  }
}

const deleteRequest = async (req, res) => {

  try {
    const product = await Product.findById(req.params.id)

    if (!product) return res.status(404).json("Product not found")

    const url = product.img
    const fileRef = ref(storage, url)
    console.log(fileRef)

    const deleted = await deleteObject(fileRef)

    const deleteProduct = await Product.findByIdAndDelete(req.params.id)

    res.status(200).json(deleteProduct)

  } catch (error) {
    res.status(500).json(error.message)
  }
}

module.exports = { postRequest, getRequest, getProductByIdRequest, deleteRequest }