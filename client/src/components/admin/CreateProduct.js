import React, { useState } from 'react'
import { Box, Button, Typography, TextField, FormControl, InputLabel, InputAdornment, OutlinedInput, CardMedia, Card } from '@mui/material'
import { useDispatch } from 'react-redux'
import storage from "../../firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { createProduct } from '../../features/productsSlice'
import { async } from '@firebase/util'

const CreateProduct = () => {

  const dispatch = useDispatch()

  // store the image in state then upload to firebase
  const [image, setImage] = useState(null)
  const [imageUpload, setImageUpload] = useState(null)
  const [name, setName] = useState("")
  const [author, setAuthor] = useState("")
  const [desc, setDesc] = useState("")
  const [price, setPrice] = useState(0)





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


  const handleSubmit = async (e) => {
    e.preventDefault()

    const fileName = new Date().getTime() + imageUpload.name
    const imageRef = ref(storage, `products/${fileName}`)
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(url => {

        // file name console.log(snapshot.ref.name)
        dispatch(createProduct({
          name,
          author,
          desc,
          price,
          img: url
        }))
      })

    })
  }


  return (
    <>
      <Box>
        <Typography>Product</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ maxWidth: 600, width: '100%', display: 'flex', flexDirection: 'column', m: 2 }}>
            <TextField label="Name" sx={{ m: 1 }} required
              value={name}
              onChange={e => setName(e.target.value)}
            >Name</TextField>
            <TextField label="Author" sx={{ m: 1 }} required
              value={author}
              onChange={e => setAuthor(e.target.value)}
            >Author</TextField>
            <TextField label="Description" sx={{ m: 1 }} multiline rows={6} required
              value={desc}
              onChange={e => setDesc(e.target.value)}
            >Description</TextField>
            <FormControl sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-amount" >Amount</InputLabel>
              <OutlinedInput
                value={price}
                onChange={e => setPrice(e.target.value)}
                type='number'
                startAdornment={<InputAdornment position="start" required
                >$</InputAdornment>}
                label="Amount"
              />
            </FormControl>

            <OutlinedInput
              sx={{ m: 1 }}
              type='file'
              onChange={e => { handleProductImage(e); setImageUpload(e.target.files[0]) }}
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
        <Button onClick={handleSubmit}>Create</Button>
      </Box >
    </>
  )
}

export default CreateProduct