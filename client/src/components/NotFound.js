import React from 'react'
import { Box } from '@mui/material'

const NotFound = () => {
  return (
    <Box sx={{
      minHeight: '80%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <h1>Error- 404 </h1>
      <h2>Page Not Found</h2>
    </Box>


  )
}

export default NotFound