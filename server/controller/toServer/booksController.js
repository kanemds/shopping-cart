const Books = require('../../models/book')




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





module.exports = { getRequest }