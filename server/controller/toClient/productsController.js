const Product = require('../../models/product')
const { ref, uploadBytes, getDownloadURL, deleteObject } = require("firebase/storage")
const { storage } = require('../../api/firebase')
const cloudinary = require("../../upload/cloudinary")


const postRequest = async (req, res) => {
  const { name, author, desc, price, img } = req.body
  console.log("img", img)
  try {

    if (img) {
      const uploadImg = await cloudinary.uploader.upload(img, {
        upload_preset: "bookstore"
      })

      console.log("upload", uploadImg)
      if (uploadImg) {

        const product = new Product({
          name, author, desc, price, img: uploadImg
        })

        const saveProduct = await product.save()
        res.status(200).json(saveProduct)
      }
    }

    // const product = new Product({
    //   name, author, desc, price, img
    // })

    // const saveProduct = await product.save()
    // res.status(201).json(saveProduct)

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

const putRequest = async (req, res) => {
  if (req.body.image) {
    try {

      const deletedPreImage = await cloudinary.uploader.destroy(
        req.body.product.img.public_id
      )

      if (deletedPreImage) {
        const updatedNewImage = await cloudinary.uploader.upload(
          req.body.image,
          {
            upload_preset: "bookstore"
          }
        )
        if (updatedNewImage) {
          const updatedProduct = await Product.findByIdAndUpdate(
            { _id: req.params.id },
            {
              $set: {
                ...req.body.product,
                img: updatedNewImage
              }
            },
            { new: true }
          )
          res.status(200).json(updatedProduct)
        }
      }
    } catch (error) {
      console.log(error)
      res.status(500).json(error.message)
    }
  } else {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $set: req.body.product
        },
        { new: true }

      )
      res.status(200).json(updatedProduct)
    } catch (error) {
      res.status(500).json(error.message)

    }
  }
}

const deleteRequest = async (req, res) => {

  try {
    const product = await Product.findById(req.params.id)

    if (!product) return res.status(404).json("Product not found")

    const url = product.img

    // find object
    const fileRef = ref(storage, url)

    const deleted = await deleteObject(fileRef)

    const deleteProduct = await Product.findByIdAndDelete(req.params.id)

    res.status(200).json(deleteProduct)

  } catch (error) {
    res.status(500).json(error.message)
  }
}

module.exports = { postRequest, getRequest, getProductByIdRequest, putRequest, deleteRequest }