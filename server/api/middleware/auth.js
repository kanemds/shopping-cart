const jwt = require('jsonwebtoken')
require('dotenv').config()

const auth = (req, res, next) => {
  const token = req.header("x-auth-token")

  if (!token) {
    return res.status(401).json("Not authenticated")
  }
  try {
    const key = process.env.JWT_SECRET
    const user = jwt.verify(token, key)

    req.user = user
    next()
  } catch (error) {
    return res.status(401).json("Not authenticated")
  }
}

const isUser = (req, res, next) => {
  auth(req, res, () => {
    if (req.user._id === req.params.id || req.user.isAdmin) {
      next()
    } else {
      res.status(403).json("Not authenticated")
    }
  })
}

const isAdmin = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.isAdmin) {
      next()
    } else {
      res.status(403).json("Not authenticated")
    }
  })
}

module.exports = { auth, isAdmin, isUser }