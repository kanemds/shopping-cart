const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./api/routes')
const methodOverride = require('method-override')


require('dotenv').config()

const app = express()
app.set("view engine", "ejs")
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

app.use(express.json({ limit: '10mb', extended: true }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(cors())
app.use(express.static('public'));
app.use(methodOverride('_method'))
app.use('/', routes)
