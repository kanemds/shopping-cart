import React from 'react'
import { Box, Typography, Card, TablePagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CardMedia } from '@mui/material'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Cart = () => {
  const cart = useSelector((state) => state.cart)
  console.log(cart)
  return (
    <>
      <Typography>Shopping Cart</Typography>
      {cart.cartItems.length === 0 ? (
        <Box>
          <Typography>Your cart is currently empty</Typography>
          <Link to='/'><Typography>Start-Shopping</Typography> </Link>
        </Box>
      ) : (
        <Box sx={{
          display: 'flex',
          justifyContent: 'center'

        }}>
          <TableContainer component={Paper} sx={{
            maxWidth: '90%',
            p: 4
          }} >
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Total</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {cart.cartItems.map((row) => {
                  const blob = new Blob([Int8Array.from(row.img.data.data)], { type: row.img.contentType })
                  const image = window.URL.createObjectURL(blob);
                  return (
                    <TableRow
                      key={row._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Box sx={{ display: 'flex', alignContent: 'center' }}>
                          <CardMedia
                            sx={{ width: 80, height: 120 }}
                            component="img"
                            image={image}
                            alt={row.name}
                          />
                          <Typography>{row.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                      <TableCell align="right">{row.cartQuantity}</TableCell>
                      <TableCell align="right">{row.price * row.cartQuantity}</TableCell>

                      <Button>+</Button>
                      <Button>-</Button>


                    </TableRow>
                  )
                }
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </>
  )
}

export default Cart