import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import storage from "../../firebase"
import { editProduct } from '../../features/productsSlice'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { Box, Button, Typography, TextField, FormControl, InputLabel, InputAdornment, OutlinedInput, CardMedia, Card } from '@mui/material'

export default function EditProduct({ id }) {

  const dispatch = useDispatch()
  const { items } = useSelector(state => state.products)


  const [currentProduct, setCurrentProduct] = useState({})
  const [previewImg, setPreviewImg] = useState("")
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
        setPreviewImg(reader.result)
      }
    } else {
      setPreviewImg(null)
    }
  }



  const handleProductImage = e => {
    const file = e.target.files[0]
    TransferImageData(file)
  }


  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log(image)

    dispatch(editProduct({
      image,
      product: {
        ...currentProduct,
        name,
        author,
        desc,
        price
      }
    }))
    // })

    // })
  }


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);

    let selectedProduct = items.filter(item => item._id === id)

    selectedProduct = selectedProduct[0]


    setCurrentProduct(selectedProduct)
    setPreviewImg(selectedProduct.img.url)
    setImage("")
    setName(selectedProduct.name)
    setAuthor(selectedProduct.author)
    setDesc(selectedProduct.desc)
    setPrice(selectedProduct.price)
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={"lg"} >
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
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
                  {previewImg ?
                    <CardMedia
                      component="img"
                      height="500"
                      width="400"
                      image={previewImg}
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
          </Box >
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Update</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
