
import React, { useState, useEffect } from 'react'
import { Box, Button, Typography, TextField, FormControl, InputLabel, InputAdornment, OutlinedInput, CardMedia, Card } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import { api, setHeaders } from '../../features/api';
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { addToCart } from '../../features/cartSlice';


const Product = () => {

  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  console.log(product.img)

  useEffect(() => {
    setLoading(true)
    const productData = async () => {
      try {
        const res = await axios.get(`${api}/product/find/${id}`, setHeaders())
        setProduct(res.data)
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }
    productData()
  }, [])

  const handleAddProdcut = product => {
    dispatch(addToCart(product))
    navigate("/cart")
  }


  return (
    <>
      {loading ?
        <Box>
          <Typography>Loading...</Typography>
        </Box> :

        <Box>
          <Typography>Product</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ maxWidth: 600, width: '100%', display: 'flex', flexDirection: 'column', m: 2 }}>
              <TextField label="Name" sx={{ m: 1 }} required
                defaultValue={product.name}

              >{product.name}</TextField>
              <TextField label="Author" sx={{ m: 1 }} required
                defaultValue={product.author}

              ></TextField>
              <TextField label="Description" sx={{ m: 1 }} multiline rows={6} required
                defaultValue={product.desc}

              ></TextField>
              <FormControl sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount" >Amount</InputLabel>
                <OutlinedInput
                  value={product.price}

                  type='number'
                  startAdornment={<InputAdornment position="start" required
                  >$</InputAdornment>}
                  label="Amount"
                />
              </FormControl>

              <OutlinedInput
                sx={{ m: 1 }}
                type='file'

              />
            </Box>
            <Box sx={{ display: 'flex', ml: 20 }}>
              <Card >

                <CardMedia
                  component="img"
                  height="500"
                  width="400"
                  image={product?.img}
                  alt="Product Image"
                />
              </Card>
            </Box>
          </Box>

          <Button onClick={() => handleAddProdcut(product)}>Add Product</Button>
        </Box >
      }
    </>
  )
}

export default Product