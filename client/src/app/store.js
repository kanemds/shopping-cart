import { configureStore } from '@reduxjs/toolkit'
import productsReducer, { getProducts } from '../features/productsSlice'
import { productsApi } from '../features/productsApi'
import cartReducer, { getTotal } from '../features/cartSlice'
import authReducer, { loadUser } from '../features/authSlice'
import ordersReducer from '../features/ordersSlice'


const store = configureStore({
  reducer: {
    products: productsReducer,
    orders: ordersReducer,
    cart: cartReducer,
    auth: authReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productsApi.middleware)
  }
})


store.dispatch(getProducts())
store.dispatch(getTotal())
store.dispatch(loadUser(null))


export default store