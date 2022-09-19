const User = require('../../models/user')
const bcrypt = require('bcrypt')
const joi = require('joi')

const postRequest = async (req, res) => {
  const registerUser = joi.object({
    name: joi.string().min(3).max(20).required(),
    email: joi.string().required().email(),
    password: joi.string().min(8).max(20).required()
  })

  const { error } = registerUser.validate(req.body)

  if (error) return res.status(400).json(error.details[0].message)

  let user = await User.findOne({ email: req.body.email })

  if (user) return res.status(400).json('Plase use another email')

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })

  // generate 10 charaters
  const salt = await bcrypt.genSalt(10)

  user.password = await bcrypt.hash(user.password, salt)

  await user.save()
}

module.exports = { postRequest }