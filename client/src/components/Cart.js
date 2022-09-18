import React from 'react'
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CardMedia, Button, IconButton } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { removeCartItem } from '../features/cartSlice';

const Cart = () => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  console.log(cart)

  const handleremoveCartItem = (item) => {
    dispatch(removeCartItem(item))
  }

  return (
    <>

      {cart.cartItems.length <= 0 ? (
        <Box sx={{ minHeight: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center' }}>
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
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="center">Total</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {cart.cartItems.map((row) => {
                  const blob = new Blob([Int8Array.from(row.img.data.data)], { type: row.img.contentType })
                  const image = window.URL.createObjectURL(blob);
                  return (
                    <TableRow
                      key={row._id}
                    >
                      <TableCell component="th" scope="row">
                        <Box sx={{ display: 'flex', alignContent: 'center' }}>
                          <CardMedia
                            sx={{ width: 80, height: 120 }}
                            component="img"
                            image={image}
                            alt={row.name}
                          />
                          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', ml: 5 }}>
                            <Typography>{row.name}</Typography>
                            <Button size='small' onClick={() => handleremoveCartItem(row)}>remove Item</Button>
                          </Box>

                        </Box>
                      </TableCell>
                      <TableCell align="center">$ {row.price <= 0 ? 0 : row.price.toFixed(2)}</TableCell>
                      <TableCell align="center">
                        <IconButton aria-label="remove" size="small" color="primary">
                          <RemoveIcon fontSize="inherit" />
                        </IconButton>
                        {row.cartQuantity}
                        <IconButton aria-label="add" size="small" color="primary">
                          <AddIcon fontSize="inherit" />
                        </IconButton>
                      </TableCell>
                      <TableCell align="center">${row.price * row.cartQuantity <= 0 ? 0 : (row.price * row.cartQuantity).toFixed(2)}</TableCell>
                    </TableRow>
                  )
                }
                )}
              </TableBody>
            </Table>
            <Box>

              <Button>Check Out</Button>
              <Typography>Total: $</Typography>

              <Typography>Taxes ans Shipping fee will show at checkout</Typography>
              <Link to='/'>Keep Shopping</Link>
            </Box>
          </TableContainer>

        </Box>
      )}
    </>
  )
}

export default Cart