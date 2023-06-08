import { createEntityAdapter } from '@reduxjs/toolkit'
import { appSlice } from '../app/api/apiSlice'

const metricAdapter = createEntityAdapter({})

const initialState = metricAdapter.getInitialState()


export const metricApiSlice = appSlice.injectEndpoints({
  endpoints: (builder) => ({
    getByAvgTime: builder.query({
      query: (args) => {
        const { dStart,dEnd,zone, user } = args
        return `/metric/getAverageTime/${dStart}/${dEnd}/${zone}/${user}`
      },
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: (responseData) => {
        const loadedMetrics = responseData
        return metricAdapter.setAll(initialState, loadedMetrics)
      }
    }),
    getByAvgGrade: builder.query({
        query: (args) => {
            const { dStart,dEnd,zone, user } = args
            return `/metric/getAverageGrade/${dStart}/${dEnd}/${zone}/${user}`
          },
          validateStatus: (response, result) => {
            return response.status === 200 && !result.isError
          },
          transformResponse: (responseData) => {
            const loadedMetrics = responseData
            console.log(responseData)
            return metricAdapter.setAll(initialState, loadedMetrics)
          }
    })
  })
})

export const {
  useGetByAvgTimeQuery,
  useGetByAvgGradeQuery
} = metricApiSlice
