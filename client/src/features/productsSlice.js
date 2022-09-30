import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import { api, setHeaders } from "./api";
import { toast } from 'react-toastify'


const initialState = {
  items: [],
  status: null,
  createStatus: null,
  editStatus: null,
  deleteStatus: null
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
      const response = await axios.post(`${api}/product`, values, setHeaders())
      return response?.data
    } catch (error) {
      console.log(error.message)
      toast.error(error.response?.data)
    }
  }
)

export const editProduct = createAsyncThunk(
  "product/editProduct",
  async (values) => {

    try {
      const response = await axios.put(`${api}/product/${values.product._id}`, values, setHeaders())
      return response?.data
    } catch (error) {
      console.log(error.message)
      toast.error(error.response?.data)
    }
  }
)


export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id) => {
    try {
      const response = await axios.delete(`${api}/product/${id}`, setHeaders())
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
      toast.success("Product Created")
    },
    [createProduct.rejected]: (state, action) => {
      state.createStatus = "rejected"
    },
    [editProduct.pending]: (state, action) => {
      state.editStatus = "pending"
    },
    [editProduct.fulfilled]: (state, action) => {
      console.log(state.items)
      console.log(action)
      const updatedProduct = state.items.map(product =>
        product._id === action.payload._id ? action.payload : product
      )


      state.items = updatedProduct
      state.editStatus = "success"
      toast.success("Product Updated")
    },
    [editProduct.rejected]: (state, action) => {
      state.editStatus = "rejected"
    },
    [deleteProduct.pending]: (state, action) => {
      state.deleteStatus = "pending"
    },
    [deleteProduct.fulfilled]: (state, action) => {
      const newList = state.items.filter(item => item._id !== action.payload._id)
      state.items = newList
      state.deleteStatus = "success"
      toast.error("Product Deleted")
    },
    [deleteProduct.rejected]: (state, action) => {
      state.deleteStatus = "rejected"
    },


  }
})

export default productsSlice.reducer