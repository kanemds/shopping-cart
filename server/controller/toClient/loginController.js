const User = require('../../models/user')
const bcrypt = require('bcrypt')
const joi = require('joi')
const jwtToken = require('../../api/toClient/jwtToken')

const postRequest = async (req, res) => {
  const registerUser = joi.object({
    email: joi.string().required().email(),
    password: joi.string().min(8).max(200).required()
  })

  const { error } = registerUser.validate(req.body)

  if (error) return res.status(400).json(error.details[0].message)

  let user = await User.findOne({ email: req.body.email })
  // check email
  if (!user) return res.status(400).json('Invalid email or password')

  const isValid = await bcrypt.compare(req.body.password, user.password)
  // check password
  if (!isValid) return res.status(400).json('Invalid email or password')

  const token = jwtToken(user)

  res.json(token)
}

module.exports = { postRequest }