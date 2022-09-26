import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import { api } from "./api";
import { toast } from 'react-toastify'


const initialState = {
  items: [],
  status: null,
  createStatus: null
}

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async () => {
    try {
      const response = await axios.get(`${api}/product`)
      return response?.data
    } catch (error) {
      console.log(error.message)
    }
  }
)

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (values) => {
    try {
      const response = await axios.post(`${api}/product`, values)
      return response?.data
    } catch (error) {
      console.log(error.message)
      toast.error(error.response?.data)
    }
  }
)


const productsSlice = createSlice({
  name: "product",
  initialState,
  // generate action creator
  reducers: {},
  // handle action types that already define
  extraReducers: {
    [getProducts.pending]: (state, action) => {
      // toolkit has internal immer 
      state.status = "pending"
    },
    [getProducts.fulfilled]: (state, action) => {
      state.items = action.payload
      state.status = "success"

    },
    [getProducts.rejected]: (state, action) => {
      state.status = "rejected"
    },
    [createProduct.pending]: (state, action) => {
      state.createStatus = "pending"
    },
    [createProduct.fulfilled]: (state, action) => {
      state.items.push(action.payload)
      state.createStatus = "success"

    },
    [createProduct.rejected]: (state, action) => {
      state.createStatus = "rejected"
    },


  }
})

export default productsSlice.reducer