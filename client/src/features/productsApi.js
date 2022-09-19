import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { api } from './api'

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: api }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "/"
    })
  })
})


// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllProductsQuery } = productsApi





// Does RTK query replace thunks?
// RTK Query is purpose-built to solve the use case of data fetching. 
// While it can't replace all of the situations where you'd use thunks or other side effects approaches, 
// using RTK Query should eliminate the need for most of that hand-written side effects logic