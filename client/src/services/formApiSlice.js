import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'

import { appSlice } from '../app/api/apiSlice'

/*
 * Link a requerimientos funcionales:
 * https://docs.google.com/spreadsheets/d/1Eme0YIj9GZCc3QCBQehDUGZIgS7aTilZx4oUy35dcGc/edit?usp=sharing
 */

// Historia de usuario M13_H1

const formAdapter = createEntityAdapter({})

const initialState = formAdapter.getInitialState()

/* This code is creating a Redux Toolkit API slice for handling form-related API requests. It uses the
`injectEndpoints` method from the `appSlice` API slice to define two endpoints: `getFormsByUser` and
`getFormCountByUser`. */
export const formApiSlice = appSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFormsByUser: builder.query({
      query: (args) => {
        const { mail } = args
        return `/form/getByUser/${mail}`
      },
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: (responseData) => {
        const loadedForm = responseData.map((form) => {
          form.id = form.id_form
          return form
        })
        return formAdapter.setAll(initialState, loadedForm)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Form', id: 'LIST' },
            ...result.ids.map((id) => ({ tpye: 'Form', id: 'LIST' }))
          ]
        } else return [{ type: 'Form', id: 'LIST' }]
      }
    }),
    getFormCountByUser: builder.query({
      query: (args) => {
        const { mail } = args
        return `/form/getCountByUser/${mail}`
      },
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: (responseData) => {
        return responseData[0].count
      }
    })
  })
})

export const { useGetFormsByUserQuery, useGetFormCountByUserQuery } =
  formApiSlice

export const selectFormResult = formApiSlice.endpoints.getFormsByUser.select()

const selectFormData = createSelector(
  selectFormResult,
  (formResult) => formResult.data
)

export const {
  selectAll: selectAllForm,
  selectById: selectFormById,
  selectIds: selectFormIds
} = formAdapter.getSelectors((state) => selectFormData(state) ?? initialState)
