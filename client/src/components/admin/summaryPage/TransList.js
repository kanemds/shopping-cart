import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Box, Paper, Typography } from '@mui/material'
import { api, setHeaders } from '../../../features/api';
import moment from 'moment'


const TransList = () => {

  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const ordersData = async () => {
      setIsLoading(true)
      try {
        const res = await axios.get(`${api}/order/translists`, setHeaders())

        setOrders(res.data)
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false)
    }
    ordersData()
  }, [])


  return (
    <>
      {isLoading ?
        <Paper sx={{ display: 'flex', flexDirection: 'column', backgroundColor: "rgba(1, 40, 106, 0.8)", color: "white" }}>
          <Typography>Loading Transactions</Typography>
        </Paper>
        :
        <Paper sx={{ display: 'flex', flexDirection: 'column', backgroundColor: "rgba(1, 40, 106, 0.8)", color: "white" }}>
          <Typography>Last Transactions</Typography>
          {
            orders?.map((order, index) => {
              let bgc = (index % 2) === 0 ? "rgba(1, 40, 106, 0.8)" : "rgba(1, 40, 106, 0.2)"
              console.log(bgc)
              return (
                <Box key={index} sx={{
                  display: 'flex', backgroundColor: bgc
                }}
                >
                  <Typography sx={{ m: 1, }}>
                    {order.shipping.name}
                  </Typography>
                  <Typography sx={{ m: 1 }}>
                    ${(order.total / 100).toFixed(2).toLocaleString()}
                  </Typography>
                  <Typography sx={{ m: 1 }}>
                    {moment(order.createdAt).fromNow()}
                  </Typography>
                </Box>
              )
            })
          }

        </Paper>
      }

    </>
  )
}

export default TransList