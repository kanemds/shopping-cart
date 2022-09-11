const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

const URL = process.env.HOST_MONGODB
const PORT = process.env.LOCAL_HOST || 4321

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('connected to mongodb')
    app.listen(PORT, () => {
      console.log('connected with server')
    })
  })
  .catch(error =>
    console.log(error.message)
  )

app.get('/', (req, res) => {
  res.send('testing')
})