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

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  extraReducers: {
    [ordersFetch.pending]: (state, action) => {
      // toolkit has internal immer 
      state.status = "pending"
    },
    [ordersFetch.fulfilled]: (state, action) => {
      state.lists = action.payload
      state.status = "success"
    },
    [ordersFetch.rejected]: (state, action) => {
      state.status = "rejected"
    }
  }
})


export default ordersSlice.reducer