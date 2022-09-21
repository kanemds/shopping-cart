import axios from 'axios'
import { useSelector } from 'react-redux'
import { api } from "../features/api"
import React from 'react'
import { Button } from '@mui/material'

const PayButton = ({ cartItems }) => {

  const user = useSelector((state => state.auth))

  const handleCheckout = () => {
    axios.post(`${api}/stripe/create-checkout-session`, {
      cartItems,
      userId: user._id
    })
      .then(res => {

        if (res.data.url) {
          window.location.href = res.data.url
        }
      })
      .catch(error => console.log(error.message))
  }

  return (
    <>
      <Button onClick={() => handleCheckout()}>Check Out</Button>
    </>
  )
}

export default PayButton