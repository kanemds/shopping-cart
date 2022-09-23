import React, { useState, useEffect } from 'react'
import { Box, Button, Typography, TextField, FormControl, InputLabel, InputAdornment, OutlinedInput, CardMedia, Card } from '@mui/material'

import storage from "../../firebase"
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage"

const CreateProduct = () => {

  // store the image in state then upload to firebase
  const [image, setImage] = useState(null)
  const [imageList, setImageList] = useState([])
  const imageListRef = ref(storage, 'producs/')

  const handleUpload = (e) => {
    if (setImage == null) return
    // path
    const fileName = new Date().getTime() + image.name
    const imageRef = ref(storage, `products/${fileName}`)
    uploadBytes(imageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(url => {
        setImageList(url)
      })
    })
  }

  useEffect(() => {
    listAll(imageListRef).then(res => {
      res.items.forEach(item => {
        getDownloadURL(item).then(url => {
          setImageList(url)
        }
        )
      })
    })
  })

  return (
    <>

      <Box>
        <Typography>Product</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ maxWidth: 600, width: '100%', display: 'flex', flexDirection: 'column', m: 2 }}>
            <TextField label="Name" sx={{ m: 1 }}>Name</TextField>
            <TextField label="Author" sx={{ m: 1 }}>Author</TextField>
            <TextField label="Description" sx={{ m: 1 }} multiline rows={6}>Description</TextField>
            <FormControl sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
              <OutlinedInput
                type='number'
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                label="Amount"
              />
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <OutlinedInput
                type='file'
                onChange={e => setImage(e.target.files[0])}
              />
              <Button onClick={handleUpload}>Upload</Button>
            </FormControl>

          </Box>
          <Box sx={{ display: 'flex', ml: 20 }}>
            <Card >
              <CardMedia
                component="img"
                height="500"
                width="400"
                image={imageList}
                alt="Product Image"
              />

            </Card>
          </Box>
        </Box>
        <Button>Create</Button>
      </Box>
    </>
  )
}

export default CreateProduct