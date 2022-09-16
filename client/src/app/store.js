import { configureStore } from '@reduxjs/toolkit'
import productsReducer, { getProducts } from '../features/productsSlice'
import { productsApi } from '../features/productsApi'
import cartReducer from '../features/cartSlice'


const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productsApi.middleware)
  }
})

store.dispatch(getProducts())

export default store