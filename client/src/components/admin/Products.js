import React from 'react'
import { Button, Box, Typography } from '@mui/material'
import { Outlet, useNavigate } from 'react-router-dom'


const Products = () => {

  const navigate = useNavigate()

  return (
    <>
      <Box>
        <Typography>Products</Typography>
        <Button onClick={() => navigate('/admin/products/create-product')}>
          Create
        </Button>
        <Outlet />
      </Box>
    </>
  )
}

export default Products