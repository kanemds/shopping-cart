import React from 'react'
import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <Box sx={{
      minHeight: '80%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Typography variant='h5'>Error 404</Typography>
      <Typography variant='h5'>Page Not Found</Typography>
      <br />
      <Typography variant='h7'><Link to='/' style={{ textDecoration: 'none', color: 'grey' }} > Back to Home Page</Link></Typography>
    </Box>


  )
}

export default NotFound