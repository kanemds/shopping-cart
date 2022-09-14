const Books = require('../models/book')

// const getRequest = async (req, res) => {
//   try {
//     const all = await Books.find()
//     res.status(201).render('index', all)
//   } catch (error) {
//     console.log(error)
//     res.status(500).json(error.message)
//   }
// }


const getRequest = (req, res) => {
  Books.find({}, (err, items) => {
    if (err) {
      console.log(err);
      res.status(500).send('An error occurred', err);
    }
    else {
      res.render('index', { items: items });
    }
  });
}

const postRequest = async (req, res) => {
  try {

  } catch (error) {

  }
}


module.exports = { getRequest, postRequest }