import React, { useState } from 'react'
import { Box, Button, Typography, TextField, FormControl, InputLabel, InputAdornment, OutlinedInput, CardMedia, Card } from '@mui/material'

import storage from "../../firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

const CreateProduct = () => {

  // store the image in state then upload to firebase
  const [image, setImage] = useState(null)


  // const [imageList, setImageList] = useState("")

  // const handleUpload = (e) => {
  //   if (setImage == null) return
  //   // path
  //   const fileName = new Date().getTime() + image.name

  //   const imageRef = ref(storage, `products/${fileName}`)
  //   uploadBytes(imageRef, image).then((snapshot) => {
  //     getDownloadURL(snapshot.ref).then(url => {
  //       setImageList(url)
  //     })
  //   })
  // }


  // transfer img data and display
  const TransferImageData = file => {
    const reader = new FileReader()

    if (file) {
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setImage(reader.result)
      }
    } else {
      setImage(null)
    }
  }

  const handleProductImage = e => {
    const file = e.target.files[0]

    TransferImageData(file)
  }

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

            <OutlinedInput
              sx={{ m: 1 }}
              type='file'
              onChange={handleProductImage}
            />
          </Box>
          <Box sx={{ display: 'flex', ml: 20 }}>
            <Card >
              {image ?
                <CardMedia
                  component="img"
                  height="500"
                  width="400"
                  image={image}
                  alt="Product Image"
                />
                :
                <Box sx={{ width: 400, height: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                  <Typography variant='h4'> Preview Product Image</Typography>
                </Box>
              }
            </Card>
          </Box>
        </Box>
        <Button>Create</Button>
      </Box >
    </>
  )
}

export default CreateProduct