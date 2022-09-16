import { configureStore } from '@reduxjs/toolkit'
import productsReducer, { getProducts } from '../features/productsSlice'
import { productsApi } from '../features/productsApi'


const store = configureStore({
  reducer: {
    products: productsReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productsApi.middleware)
  }
})

store.dispatch(getProducts())

export default store