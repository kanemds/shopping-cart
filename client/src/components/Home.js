import React from 'react'
import { useGetAllProductsQuery } from '../features/productsApi'

const Home = () => {
  const { data, eorror, isLoading } = useGetAllProductsQuery()
  return (
    <div>Home</div>
  )
}

export default Home