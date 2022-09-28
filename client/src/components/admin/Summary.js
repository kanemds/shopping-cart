import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Box, Paper, Typography } from '@mui/material'
import GroupsIcon from '@mui/icons-material/Groups';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { api, setHeaders } from '../../features/api';

const Summary = () => {

  const [users, setUsers] = useState([])
  const [usersPercent, setUsersPercent] = useState(0)



  const [orders, setOrders] = useState([])
  const [ordersPercent, setOrdersPercent] = useState(0)

  const [earnings, setEarnings] = useState([])
  const [earningsPercent, setEarningsPercent] = useState(0)

  console.log(earnings)
  console.log(earningsPercent)

  useEffect(() => {
    const usersData = async () => {
      try {
        const res = await axios.get(`${api}/user`, setHeaders())
        setUsers(res.data)
        setUsersPercent(((res.data[0].total - res.data[1].total) / res.data[1].total) * 100)
      } catch (error) {
        console.log(error)
      }
    }
    usersData()
  }, [])

  useEffect(() => {
    const ordersData = async () => {
      try {
        const res = await axios.get(`${api}/order`, setHeaders())
        setOrders(res.data)
        setOrdersPercent(((res.data[0].total - res.data[1].total) / res.data[1].total) * 100)
      } catch (error) {
        console.log(error)
      }
    }
    ordersData()
  }, [])

  useEffect(() => {
    const earningsData = async () => {
      try {
        const res = await axios.get(`${api}/order/earning`, setHeaders())
        setEarnings(res.data)
        setEarningsPercent(((res.data[0].total - res.data[1].total) / res.data[1].total) * 100)
      } catch (error) {
        console.log(error)
      }
    }
    earningsData()
  }, [])

  return (
    <Box >
      <Paper sx={{ display: 'flex', flexDirection: 'column', backgroundColor: "rgba(1, 40, 106, 0.8)", color: "white" }}>
        <Box sx={{ m: 2 }} align='left'>
          <Typography variant='h4'>Overview</Typography>
          <Typography>Report from the previous month</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2, mb: 2 }}>


          {/* user */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', backgroundColor: "rgba(35, 177, 3, 0.5)", borderRadius: .7, p: 1 }}>
              <GroupsIcon fontSize='large' />
            </Box>
            <Box sx={{ ml: 1 }}>
              <Typography variant='h5'>{users[0]?.total}</Typography>
              <Typography>Users</Typography>
            </Box>
            {
              usersPercent >= 0 ? <Typography sx={{ ml: 1, color: 'green' }}>{usersPercent}%</Typography> :
                <Typography variant='h6' sx={{ ml: 1, color: 'red' }}>{usersPercent}%</Typography>
            }
          </Box>


          {/* order */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', backgroundColor: "rgba(244, 255, 0, 0.5)", borderRadius: .7, p: 1 }}>
              <LocalMallIcon fontSize='large' />
            </Box>
            <Box sx={{ ml: 1 }}>
              <Typography variant='h5'>{orders[0]?.total}</Typography>
              <Typography>Orders</Typography>
            </Box>
            {
              ordersPercent >= 0 ? <Typography sx={{ ml: 1, color: 'green' }}>{ordersPercent}%</Typography> :
                <Typography variant='h6' sx={{ ml: 1, color: 'red' }}>{ordersPercent}%</Typography>
            }
          </Box>


          {/* earnings */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', backgroundColor: "rgba(8, 212, 226, 0.3)", borderRadius: .7, p: 1 }}>
              <MonetizationOnIcon fontSize='large' />
            </Box>
            <Box sx={{ ml: 1 }}>
              <Typography variant='h5'>${earnings[0]?.total.toLocaleString()}</Typography>
              <Typography>Earnings</Typography>
            </Box>
            {
              earningsPercent >= 0 ? <Typography sx={{ ml: 1, color: 'green' }}>{earningsPercent}%</Typography> :
                <Typography variant='h6' sx={{ ml: 1, color: 'red' }}>{earningsPercent}%</Typography>
            }
          </Box>


        </Box>
      </Paper>
    </Box>


  )
}

export default Summary