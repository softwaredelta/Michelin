import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const appSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://18.224.84.36:3080' }),
  tagTypes: ['User'],
  endpoints: builder => ({})
})
