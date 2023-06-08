import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

/* This code is creating an API using the `createApi` function from the `@reduxjs/toolkit/query/react`
library. The API is configured with a `baseUrl` and a function to prepare headers for requests.
*/
export const appSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3080/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token') // eslint-disable-line
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    }
  }),
  tagTypes: ['User', 'Question'],
  endpoints: builder => ({})
})
