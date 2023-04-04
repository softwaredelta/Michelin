import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const appSlice = createApi({
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3080'}),
    tagTypes: ['User'],
    endpoints: builder => ({})
})