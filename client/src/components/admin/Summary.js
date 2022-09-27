import React from 'react'

import { Box, Paper, Typography } from '@mui/material'
import GroupsIcon from '@mui/icons-material/Groups';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const Summary = () => {


  return (
    <Box >
      <Paper sx={{ display: 'flex', flexDirection: 'column', backgroundColor: "rgba(1, 40, 106, 0.8)", color: "white" }}>
        <Box sx={{ m: 2 }} align='left'>
          <Typography variant='h4'>Overview</Typography>
          <Typography>Report from the previous month</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2, mb: 2 }}>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', backgroundColor: "rgba(35, 177, 3, 0.3)", borderRadius: .7, p: 1 }}>
              <GroupsIcon fontSize='large' />
            </Box>
            <Box sx={{ ml: 1 }}>
              <Typography variant='h5'>50</Typography>
              <Typography>Users</Typography>
            </Box>
            <Typography sx={{ ml: 1 }}>50%</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', backgroundColor: "rgba(244, 255, 0, 0.3)", borderRadius: .7, p: 1 }}>
              <LocalMallIcon fontSize='large' />
            </Box>
            <Box sx={{ ml: 1 }}>
              <Typography variant='h5'>50</Typography>
              <Typography>Orders</Typography>
            </Box>
            <Typography sx={{ ml: 1 }}>50%</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', backgroundColor: "rgba(8, 212, 226, 0.3)", borderRadius: .7, p: 1 }}>
              <MonetizationOnIcon fontSize='large' />
            </Box>
            <Box sx={{ ml: 1 }}>
              <Typography variant='h5'>50</Typography>
              <Typography>Earning</Typography>
            </Box>
            <Typography sx={{ ml: 1 }}>50%</Typography>
          </Box>
        </Box>
      </Paper>
    </Box>


  )
}

export default Summary