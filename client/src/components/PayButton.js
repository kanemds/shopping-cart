import axios from 'axios'
import { useSelector } from 'react-redux'
import { url } from "../features/api"
import React from 'react'
import { Button } from '@mui/material'

const PayButton = ({ cartItems }) => {

  const handleCheckout = () => {
    console.log(cartItems)
  }

  return (
    <>
      <Button onClick={() => handleCheckout()}>Check Out</Button>
    </>
  )
}

export default PayButton