import { createEntityAdapter } from '@reduxjs/toolkit'
import { appSlice } from '../app/api/apiSlice'

const metricAdapter = createEntityAdapter({})

const initialState = metricAdapter.getInitialState()

/*
 * Link a requerimientos funcionales:
 * https://docs.google.com/spreadsheets/d/1Eme0YIj9GZCc3QCBQehDUGZIgS7aTilZx4oUy35dcGc/edit?usp=sharing
 */

// Historia de usuario M5_H1

export const metricApiSlice = appSlice.injectEndpoints({
  endpoints: (builder) => ({
    getByAvgTime: builder.query({
      query: (args) => {
        const { dStart, dEnd, zone, user } = args
        return `/metric/getAverageTime/${dStart}/${dEnd}/${zone}/${user}`
      },
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: (responseData) => {
        const loadedMetrics = responseData
        return metricAdapter.setAll(initialState, { loadedMetrics })
      }
    }),
    getAvgPDV: builder.query({
      query: (args) => {
        const { dStart, dEnd, zone, user } = args
        return `/metric/getAverageGradePDV/${dStart}/${dEnd}/${zone}/${user}`
      },
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: (responseData) => {
        const loadedMetrics = responseData
        return metricAdapter.setAll(initialState, { loadedMetrics })
      }
    }),
    getFormsCu: builder.query({
      query: (args) => {
        const { dStart, dEnd, zone, user } = args
        return `/metric/getFormsCurrentMonth/${dStart}/${dEnd}/${zone}/${user}`
      },
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: (responseData) => {
        const loadedMetrics = responseData
        return metricAdapter.setAll(initialState, { loadedMetrics })
      }
    }),
    getByAvgGrade: builder.query({
      query: (args) => {
        const { dStart, dEnd, zone, user } = args
        return `/metric/getAverageGradeByMonth/${dStart}/${dEnd}/${zone}/${user}`
      },
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: (responseData) => {
        const loadedMetrics = responseData
        return metricAdapter.setAll(initialState, { loadedMetrics })
      }
    }),
    getByAvgGradeCur: builder.query({
      query: (args) => {
        const { dStart, dEnd, zone, user } = args
        return `/metric/getAverageGradeCur/${dStart}/${dEnd}/${zone}/${user}`
      },
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: (responseData) => {
        const loadedMetrics = responseData
        return metricAdapter.setAll(initialState, { loadedMetrics })
      }
    }),
    getToursByMonths: builder.query({
      query: (args) => {
        const { zone, user } = args
        return `/metric/getFormsByMonth/${zone}/${user}`
      },
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: (responseData) => {
        const loadedMetrics = responseData
        return metricAdapter.setAll(initialState, { loadedMetrics })
      }
    }),
    getTimeByMonths: builder.query({
      query: (args) => {
        const { zone, user } = args
        return `/metric/getAverageTimeByMonth/${zone}/${user}`
      },
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: (responseData) => {
        const loadedMetrics = responseData
        return metricAdapter.setAll(initialState, { loadedMetrics })
      }
    }),
    getFormsByMonthsUser: builder.query({
      query: (args) => {
        const { zone } = args
        return `/metric/getFormsByMonthUser/${zone}/${localStorage.getItem('mail')}` // eslint-disable-line
      },
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: (responseData) => {
        const loadedMetrics = responseData
        return metricAdapter.setAll(initialState, { loadedMetrics })
      }
    }),
    getByMail: builder.query({
      query: () => {
        return `/metric/getUserMail/${localStorage.getItem('mail')}` // eslint-disable-line
      },
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: (responseData) => {
        const loadedMetrics = responseData
        return metricAdapter.setAll(initialState, loadedMetrics)
      }
    })
  })
})

export const {
  useGetByAvgTimeQuery,
  useGetByAvgGradeQuery,
  useGetToursByMonthsQuery,
  useGetTimeByMonthsQuery,
  useGetByAvgGradeCurQuery,
  useGetAvgPDVQuery,
  useGetFormsCuQuery,
  useGetFormsByMonthsUserQuery,
  useGetByMailQuery
} = metricApiSlice
