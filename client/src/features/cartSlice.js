import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify'

const initialState = {
  cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        item => item._id === action.payload._id
      )
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1
        toast.info(`increased ${state.cartItems[itemIndex].name} quantity`, {
          position: "bottom-left"
        })
      } else {
        const currentProduct = { ...action.payload, cartQuantity: 1 }
        state.cartItems.push(currentProduct)
        toast.success(`added ${action.payload.name} to cart`, {
          position: "bottom-left"
        })
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
    },
    removeCartItem(state, action) {
      const remainItems = state.cartItems.filter(cartItem => cartItem._id !== action.payload._id)
      state.cartItems = remainItems
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
      toast.error(` ${action.payload.name} has been removed`, {
        position: "bottom-left"
      })
    }
  }
})

export const { addToCart, removeCartItem } = cartSlice.actions

export default cartSlice.reducer