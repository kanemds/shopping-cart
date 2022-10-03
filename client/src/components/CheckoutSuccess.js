import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, getTotal } from '../features/cartSlice'


const CheckoutSuccess = () => {

  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)

  useEffect(() => {
    dispatch(clearCart())
  }, [dispatch])

  useEffect(() => {
    dispatch(getTotal())
  }, [cart, dispatch])

  return (
    <div>CheckoutSuccess</div>
  )
}

export default CheckoutSuccess