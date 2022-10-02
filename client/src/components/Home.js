import React from 'react'
import { useGetAllProductsQuery } from '../features/productsApi'
import { Box, Card, CardContent, CardMedia, Typography, CardActionArea, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../features/cartSlice'
import { useNavigate } from 'react-router-dom'
import { api } from '../features/api'

const Home = () => {

  const { items: data, status } = useSelector(state => state.products)

  console.log(data, status)
  // const { data, error, isLoading } = useGetAllProductsQuery()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
    navigate('/cart')
  }

  return (
    <>
      <Box>

        {data?.map(product => {

          return (
            < Card key={product._id} sx={{ maxWidth: 345, display: 'flex', m: 2, p: 2 }
            }>
              <Box>
                <CardActionArea>
                  <Button onClick={() => navigate(`/product/${product._id}`)}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={product.img.url}
                      alt={product.name}
                    />
                  </Button>
                </CardActionArea>
              </Box>
              <Box>

                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${(product.price).toFixed(2)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.desc}
                  </Typography>
                </CardContent>

                <Button onClick={() => handleAddToCart(product)}>Add to Cart</Button>
              </Box>
            </Card>
          )
        }
        )}
      </Box>


    </>
  )
}

export default Home