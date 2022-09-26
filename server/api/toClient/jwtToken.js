const jwt = require('jsonwebtoken')
require('dotenv').config()

const jwtToken = (user) => {

  const key = process.env.JWT_SECRET

  const token = jwt.sign({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin
  }, key)

  return token
}

module.exports = jwtToken