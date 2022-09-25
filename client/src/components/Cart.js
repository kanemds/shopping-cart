import React, { useEffect } from 'react'
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CardMedia, Button, IconButton } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { decreaseCartItem, removeCartItem, increaseCartItem, getTotal } from '../features/cartSlice';
import PayButton from './PayButton';

const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const auth = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getTotal())
  }, [cart, dispatch])

  const handleRemoveCartItem = (item) => {
    dispatch(removeCartItem(item))
  }

  const handleDecreaseCartItem = (item) => {
    dispatch(decreaseCartItem(item))
  }

  const handleIncreaseCartItem = (item) => {
    dispatch(increaseCartItem(item))
  }

  return (
    <>

      {cart.cartItems.length <= 0 ? (
        <Box sx={{ minHeight: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center' }}>
          <Typography>Your cart is currently empty</Typography>
          <Link to='/' style={{ textDecoration: 'none', color: 'grey' }}><Typography>Start-Shopping</Typography> </Link>
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
                  return (
                    <TableRow
                      key={row._id}
                    >
                      <TableCell component="th" scope="row">
                        <Box sx={{ display: 'flex', alignContent: 'center' }}>
                          <CardMedia
                            sx={{ width: 80, height: 120 }}
                            component="img"
                            image={row.img}
                            alt={row.name}
                          />
                          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', ml: 5 }}>
                            <Typography>{row.name}</Typography>
                            <Button size='small' onClick={() => handleRemoveCartItem(row)}>remove Item</Button>
                          </Box>

                        </Box>
                      </TableCell>
                      <TableCell align="center">$ {row.price <= 0 ? 0 : row.price.toFixed(2)}</TableCell>
                      <TableCell align="center">
                        <IconButton aria-label="remove" size="small" color="primary" onClick={() => handleDecreaseCartItem(row)} >
                          <RemoveIcon fontSize="inherit" />
                        </IconButton>
                        {row.cartQuantity}
                        <IconButton aria-label="add" size="small" color="primary" onClick={() => handleIncreaseCartItem(row)}>
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
              {auth._id ?
                <PayButton cartItems={cart.cartItems} /> :
                <Button onClick={() => navigate('/login')}>Login to Check out</Button>
              }

              <Typography>Total: ${(cart.cartTotalAmount).toFixed(2)}</Typography>

              <Typography>Taxes ans Shipping fee will show at checkout</Typography>
              <Link to='/'>Keep Shopping</Link>
            </Box>
          </TableContainer>

        </Box>
      )
      }
    </>
  )
}

export default Cart