import {
  createSelector,
  createEntityAdapter
} from '@reduxjs/toolkit'

import { appSlice } from '../../app/api/apiSlice'

const formAdapter = createEntityAdapter({})

const initialState = formAdapter.getInitialState()

export const formApiSlice = appSlice.injectEndpoints({
  endpoints: builder => ({
    getForm: builder.query({
      query: () => '/form/report/:fileName',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: responseData => {
        const loadedForm = responseData.map(form => {
          form.id = form.id_form
          return form
        })
        return formAdapter.setAll(initialState, loadedForm)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Form', id: 'LIST' },
            ...result.ids.map(id => ({ tpye: 'Form', id: 'LIST' }))
          ]
        } else return [{ type: 'Form', id: 'LIST' }]
      }
    }),
    addNewForm: builder.mutation({
      query: initialUserData => ({
        url: '/form/postForm',
        method: 'POST',
        body: { ...initialUserData }
      }),
      invalidatesTags: [
        { type: 'Form', id: 'LIST' }
      ]
    })
  })
})

export const {
  useGetFormQuery,
  useAddNewFormMutation
} = formApiSlice

export const selectFormResult = formApiSlice.endpoints.getForm.select()

const selectFormData = createSelector(
  selectFormResult,
  formResult => formResult.data
)

export const {
  selectAll: selectAllForm,
  selectById: selectFormById,
  selectIds: selectFormIds
} = formAdapter.getSelectors(state => selectFormData(state) ?? initialState)
