const User = require('../../models/user')
const { auth, isUser, isAdmin } = require('../../api/middleware/auth')
const moment = require('moment')

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
      }
    ])

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json(error.message)
  }

}

module.exports = { getRequest }