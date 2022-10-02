import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import { api, setHeaders } from "./api";
import { toast } from 'react-toastify'

const initialState = ({
  lists: [],
  status: null,
  deleteStatus: null
})

export const getAllUsers = createAsyncThunk("users/getAllUsers", async () => {
  try {
    const response = await axios.get(`${api}/user/all`, setHeaders())
    return response.data
  } catch (error) {
    console.log(error.message)
  }
})

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  try {
    const response = await axios.delete(`${api}/user/${id}`, setHeaders())
    return response.data
  } catch (error) {
    console.log(error.message.data)
    toast.error(error.response?.data, {

    })
  }
})

const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: {
    [getAllUsers.pending]: (state, action) => {
      state.status = "pending"
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.lists = action.payload
      state.status = "success"
    },
    [getAllUsers.rejected]: (state, action) => {
      state.status = "rejected"
    },
  }
})

export default usersSlice.reducer