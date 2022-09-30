import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { api, setHeaders } from './api'

const initialState = {
  lists: [],
  status: null
}

export const ordersFetch = createAsyncThunk("orders/ordersFetch", async () => {
  try {
    const response = await axios.get(`${api}/order/translists`, setHeaders())
    return response.data
  } catch (error) {
    console.log(error.message)
  }
})

export const editOrder = createAsyncThunk(
  "orders/editOrder",
  async (values, { getState }) => {
    console.log(values)
    const state = getState()

    let currentOrder = state.orders.lists.filter(order =>
      order._id === values.id
    )
    const newOrder = {
      ...currentOrder[0],
      delivery_status: values.delivery_status
    }
    try {
      const response = await axios.put(`${api}/order/${values.id}`, newOrder, setHeaders())
      console.log(response)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
)

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  extraReducers: {
    [ordersFetch.pending]: (state, action) => {
      state.status = "pending"
    },
    [ordersFetch.fulfilled]: (state, action) => {
      state.lists = action.payload
      state.status = "success"
    },
    [ordersFetch.rejected]: (state, action) => {
      state.status = "rejected"
    },
    [editOrder.pending]: (state, action) => {
      state.status = "pending"
    },
    [editOrder.fulfilled]: (state, action) => {

      const updatedOrder = state.lists.map(order => order && order._id === action.payload._id ? action.payload : order)
      state.lists = updatedOrder
      state.status = "success"
    },
    [editOrder.rejected]: (state, action) => {
      state.status = "rejected"
    }
  }
})


export default ordersSlice.reducer