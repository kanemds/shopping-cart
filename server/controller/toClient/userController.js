const User = require('../../models/user')
const moment = require('moment')
const bcrypt = require('bcrypt')

const getRequest = async (req, res) => {

  const previousMonth = moment()
    .month(moment().month() - 1)
    .set("date", 1)
    .format("YYYY-MM-DD HH:mm:ss")

  try {
    const user = await User.aggregate([
      {
        // gte = greater than and equal to
        // $match filter the date
        $match: { createdAt: { $gte: new Date(previousMonth) } }

      },
      {
        // selected filed
        $project: {
          month: { $month: "$createdAt" }
        }
      },
      {
        $group: {
          // _id: 8  as Auguest
          _id: "$month",
          // calculate the total in this month
          total: { $sum: 1 }
        }
      },
      {
        $sort: { _id: -1 }
      }
    ])

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json(error.message)
  }
}

const getAllRequest = async (req, res) => {
  try {
    const allUser = await User.find().sort({ _id: -1 })
    res.status(200).json(allUser)
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message)
  }
}

const findOneRequest = async (req, res) => {
  try {
    const findOneUser = await User.findById(req.params.id)
    res.status(200).json({
      _id: findOneUser._id,
      name: findOneUser.name,
      email: findOneUser.email,
      isAdmin: findOneUser.isAdmin
    })
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message)
  }
}

const putRequest = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (user.email !== req.body.email) {
      const exist = await User.findOne({ email: req.body.email })
      if (exist) {
        return res.status(400).json("Email already exist")
      }
    }

    if (req.body.password && user) {
      const salt = await bcrypt.genSalt(10)
      const pw = await bcrypt.hash(req.body.password, salt)

      user.password = pw
    }

    const updateUser = await User.findByIdAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name,
        email: req.body.email,
        isAdmin: req.body.isAdmin,
        password: user.password
      },
      { new: true }
    )

    res.status(200).json(updateUser)
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message)
  }
}

const deleteRequest = async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id)
    res.status(200).json(deleteUser)
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message)
  }
}




module.exports = { getRequest, getAllRequest, deleteRequest, findOneRequest, putRequest }