import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const appSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:3080' }),
  tagTypes: ['User', 'Question'],
  endpoints: builder => ({})
})
