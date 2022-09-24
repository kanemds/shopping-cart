const Product = require('../../models/product')

const postRequest = async (req, res) => {
  const { name, author, desc, img } = req.body

  try {
    const product = new Product({
      name, author, desc, img
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

module.exports = { postRequest, getRequest }