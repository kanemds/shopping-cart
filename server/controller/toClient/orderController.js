const Order = require('../../models/order')
const moment = require('moment')
const order = require('../../models/order')

const getRequest = async (req, res) => {

  const previousMonth = moment()
    .month(moment().month() - 1)
    .set("date", 1)
    .format("YYYY-MM-DD HH:mm:ss")

  try {
    const order = await Order.aggregate([
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

    res.status(200).json(order)
  } catch (error) {
    res.status(500).json(error.message)
  }
}

const getEarningRequest = async (req, res) => {

  const previousMonth = moment()
    .month(moment().month() - 1)
    .set("date", 1)
    .format("YYYY-MM-DD HH:mm:ss")

  try {
    const earning = await Order.aggregate([
      {
        // gte = greater than and equal to
        // $match filter the date
        $match: { createdAt: { $gte: new Date(previousMonth) } }

      },
      {
        // selected filed
        $project: {
          month: { $month: "$createdAt" },
          sales: "$total"
        }
      },
      {
        $group: {
          // _id: 8  as Auguest
          _id: "$month",
          // calculate the total in this month
          total: { $sum: "$sales" }
        }
      },
      {
        $sort: { _id: -1 }
      }
    ])

    res.status(200).json(earning)
  } catch (error) {
    res.status(500).json(error.message)
  }
}

const getWeeklyRequest = async (req, res) => {

  const last7Days = moment()
    .day(moment().day() - 7)
    .format("YYYY-MM-DD HH:mm:ss")

  try {
    const weeklySales = await Order.aggregate([
      {
        $match: { createdAt: { $gte: new Date(last7Days) } }
      },
      {
        $project: {
          //dayOfWeek sun-sat 1 -7
          dayOfYear: { $dayOfYear: "$createdAt" },
          dayOfWeek: { $dayOfWeek: "$createdAt" },
          sales: "$total"
        }
      },
      {
        $group: {
          _id: {
            "dayInYear": "$dayOfYear",
            "dayInWeek": "$dayOfWeek",
          },

          total: { $sum: "$sales" }

        }
      },
      {
        $sort: { _id: 1 }
      }
    ])

    res.status(200).json(weeklySales)
  } catch (error) {
    res.status(500).json(error.message)
  }
}

const getLastRequest = async (req, res) => {
  const query = req.query.new

  try {
    const orders = query ? await Order.find().sort({ _id: -1 }).limit(4) :
      await Order.find().sort({ _id: -1 })

    res.status(200).json(orders)
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message)
  }
}

const getOneRequest = async (req, res) => {


  try {
    const findCurrentOrder = await Order.findById(req.params.id)


    if (req.user._id !== findCurrentOrder.userId || !req.user.isAdmin) {
      return res.status(403).json("Not authorized")
    }

    res.status(200).json(findCurrentOrder)

  } catch (error) {
    res.status(500).json(error.message)
  }
}

const putRequest = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: req.body
      },
      { new: true }
    )
    console.log(updatedOrder)
    res.status(200).json(updatedOrder)
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message)
  }
}


module.exports = { getRequest, getEarningRequest, getWeeklyRequest, getLastRequest, putRequest, getOneRequest }