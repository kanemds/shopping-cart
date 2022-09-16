import React from 'react'
import { useGetAllProductsQuery } from '../features/productsApi'
import { Box, Card, CardContent, CardMedia, Typography, CardActionArea, Button } from '@mui/material'

const Home = () => {
  const { data, error, isLoading } = useGetAllProductsQuery()

  return (
    <>
      {isLoading ? <Typography>Loading...</Typography> : error ? <Typography>Error Occured</Typography> : (
        <Box>
          <Typography variant='h3'>New Arrivals</Typography>
          {data?.map(product => {

            // conver bindata from mongodb image
            const blob = new Blob([Int8Array.from(product.img.data.data)], { type: product.img.contentType })
            const image = window.URL.createObjectURL(blob);

            return (
              < Card key={product.id} sx={{ maxWidth: 345, display: 'flex' }
              }>
                <Box>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={image}
                      alt={product.name}
                    />
                  </CardActionArea>
                </Box>
                <Box>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ${product.price}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product.desc}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <Button>Add to Cart</Button>
                </Box>
              </Card>
            )
          }
          )}
        </Box>
      )
      }
    </>
  )
}

export default Home