const Order = require('../../models/order')
const moment = require('moment')

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
    console.log(weeklySales)
    res.status(200).json(weeklySales)
  } catch (error) {
    res.status(500).json(error.message)
  }
}

module.exports = { getRequest, getEarningRequest, getWeeklyRequest }