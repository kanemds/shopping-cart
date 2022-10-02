import React, { useState, useEffect } from 'react'
import { Box, Paper, Typography } from '@mui/material'
import axios from 'axios'
import { api, setHeaders } from '../../features/api'
import { useParams } from 'react-router-dom'

const Order = () => {

  const { id } = useParams()

  const [currentOrder, setCurrentOrder] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getOrder = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${api}/order/find/${id}`, setHeaders())

        setCurrentOrder(response.data)
        setLoading(false)
      } catch (error) {
        console.log(error.message)
      }
    }
    getOrder()
  }, [id])

  console.log(currentOrder)


  return (
    <>
      <Paper>
        <Box>
          <Typography>Order Details</Typography>

          <Typography>
            Delivery Status: {
              currentOrder.delivery_status === "pending" ? <Typography>Pending</Typography> :
                currentOrder.delivery_status === "dispatched" ? <Typography>Dispatched</Typography> :
                  currentOrder.delivery_status === "delivered" ? <Typography>Delivered</Typography> :
                    <Typography>System Error</Typography>
            }
          </Typography>
        </Box>
        <Box>
          <Typography>Products</Typography>
        </Box>
        <Box>
          <Typography>Total</Typography>
        </Box>
        <Box>
          <Typography>Shipping Details</Typography>
        </Box>
      </Paper>



    </>
  )
}

export default Order