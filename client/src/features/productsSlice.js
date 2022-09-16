import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"


const initialState = {
  items: [],
  status: null,

}

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async () => {
    try {
      const response = await axios.get("http://localhost:6001/")
      return response?.data
    } catch (error) {
      console.log(error.message)
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
      state.status = "success"
      state.items = action.paylod
    }, [getProducts.rejected]: (state, action) => {
      state.status = "rejected"
    },
  }
})

export default productsSlice.reducer