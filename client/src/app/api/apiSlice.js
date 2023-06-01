import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const appSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3080',
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
