import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Box, Paper, Typography } from '@mui/material'
import { api, setHeaders } from '../../../features/api';


export const AllTimeData = () => {

  const { items } = useSelector(state => state.products)



  return (
    <>
      <Paper sx={{ display: 'flex', flexDirection: 'column', backgroundColor: "rgba(1, 40, 106, 0.8)", color: "white" }}>
        <Typography>All Time Data</Typography>
        <Box>
          <Box>
            <Typography>Users</Typography>
            <Typography>200</Typography>
          </Box>
          <Box>
            <Typography>Products</Typography>
            <Typography>{items.length}</Typography>
          </Box>
          <Box>
            <Typography>Orders</Typography>
            <Typography>200</Typography>
          </Box>
          <Box>
            <Typography>Earnings</Typography>
            <Typography>200</Typography>
          </Box>
        </Box>
      </Paper>
    </>
  )
}
