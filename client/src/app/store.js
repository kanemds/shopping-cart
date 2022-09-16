import { configureStore } from '@reduxjs/toolkit'
import productsReducer, { getProducts } from '../features/productsSlice'



const store = configureStore({
  reducer: {
    products: productsReducer
  }
})

store.dispatch(getProducts())

export default store