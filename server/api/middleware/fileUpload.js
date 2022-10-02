const express = require('express')
const router = express.Router()
const path = require("path")
// const { getStorage, ref, uploadBytes } = require("firebase/storage")


router.post('/', (req, res) => {
  // req.files.image: image is an object as file name

  console.log(req.files)

  const image = req.files.file
  const path = __dirname + "/node/express-fileupload/test/temp/tmp-16-1570084843942/" + image.name;

  console.log(req.files)
  console.log(image)
  res.status(200).json(image)
  req.file
  const storage = getStorage();
  const storageRef = ref(storage, 'some-child');

  const bytes = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x2c, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64, 0x21]);
  uploadBytes(storageRef, bytes).then((snapshot) => {
    console.log('Uploaded an array!');
  });

})

module.exports = router