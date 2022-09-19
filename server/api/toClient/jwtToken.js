const jwt = require('jsonwebtoken')
require('dotenv').config()

const jwtToken = (user) => {

  const key = process.env.JWT.SECRET

  const token = jwt.sign({
    _id: user._id,
    name: user.name,
    email: user.email
  }, key)

  return token
}

module.exports = jwtToken