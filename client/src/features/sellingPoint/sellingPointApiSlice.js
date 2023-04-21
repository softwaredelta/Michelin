import {
  createSelector,
  createEntityAdapter
} from '@reduxjs/toolkit'

import { appSlice } from '../../app/api/apiSlice'

const sellingPointAdapter = createEntityAdapter({})

const initialState = sellingPointAdapter.getInitialState()

export const sellingPointApiSlice = appSlice.injectEndpoints({
  endpoints: builder => ({
    getSP: builder.query({
      query: () => '/sellingPoint/list',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: responseData => {
        const loadedSP = responseData.map(sp => {
          sp.id = sp.id_sp
          return sp
        })
        return sellingPointAdapter.setAll(initialState, loadedSP)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'sp', id: 'LIST' },
            ...result.ids.map(id => ({ tpye: 'sp', id: 'LIST' }))
          ]
        } else return [{ type: 'sp', id: 'LIST' }]
      }
    }),
    addNewSP: builder.mutation({
      query: initialUserData => ({
        url: '/sellingPoint/addSellingPoint',
        method: 'POST',
        body: { ...initialUserData }
      }),
      invalidatesTags: [
        { type: 'sp', id: 'LIST' }
      ]
    })
  })
})

export const {
  useGetSPQuery,
  useAddNewSPMutation
} = sellingPointApiSlice

export const selectSPResult = sellingPointApiSlice.endpoints.getSP.select()

const selectSPData = createSelector(
  selectSPResult,
  sellingPointResult => sellingPointResult.data
)

export const {
  selectAll: selectAllSP,
  selectById: selectSPById,
  selectIds: selectSPIds
} = sellingPointAdapter.getSelectors(state => selectSPData(state) ?? initialState)
