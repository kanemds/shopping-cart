const Product = require('../../models/product')
const { getStorage, ref, deleteObject } = require("firebase/storage")

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

    if (product.img) {
      const storage = getStorage()
      let imageRef = storage.refFromURL({ url: product.img })
      console.log(imageRef)
      const desertRef = await ref(storage, `products/${imageRef}`)
      const deleteImage = deleteObject(desertRef).then(() => {
        console.log("File deleted successfully")
      }).catch((error) => {
        console.log("An error occurred!")
      });

      if (deleteImage) {
        const deleteProduct = await Product.findByIdAndDelete(req.params.id)

        res.status(200).json(deleteProduct)
      }
    }
  } catch (error) {
    res.status(500).json(error.message)
  }
}

module.exports = { postRequest, getRequest, getProductByIdRequest, deleteRequest }