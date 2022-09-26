import React from 'react'
import Grid from '@mui/material/Unstable_Grid2'
import { styled } from '@mui/material/styles'
import { Box, Paper, Typography, Card } from '@mui/material'
import GroupsIcon from '@mui/icons-material/Groups';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const Summary = () => {




  return (
    <>
      <Box >

        <Paper sx={{ display: 'flex', flexDirection: 'column', backgroundColor: "rgba(1, 40, 106, 0.8)", color: "white" }}>
          <Box sx={{ m: 2 }} align='left'>
            <Typography variant='h4'>Overview</Typography>
            <Typography>Report from the previous month</Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <GroupsIcon fontSize='large' sx={{ color: "rgba(230, 255, 110, 0.9)" }} />
              <Box>
                <Typography>50</Typography>
                <Typography>Users</Typography>
              </Box>
              <Typography>50%</Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocalMallIcon fontSize='large' />
              <Box>
                <Typography>50</Typography>
                <Typography>Orders</Typography>
              </Box>
              <Typography>50%</Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <MonetizationOnIcon fontSize='large' />
              <Box>
                <Typography>50</Typography>
                <Typography>Users</Typography>
              </Box>
              <Typography>50%</Typography>
            </Box>
          </Box>
        </Paper>


      </Box>
    </>

  )
}

export default Summary