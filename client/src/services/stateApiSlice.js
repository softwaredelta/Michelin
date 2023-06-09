import {
  createSelector,
  createEntityAdapter
} from '@reduxjs/toolkit'

import { appSlice } from '../app/api/apiSlice'

const stateAdapter = createEntityAdapter({})

const initialState = stateAdapter.getInitialState()

/* This code is creating an API slice using the `injectEndpoints` method from the `@reduxjs/toolkit`
library. The `stateApiSlice` object contains two endpoints: `getState` and `getStatesByUser`. */
export const stateApiSlice = appSlice.injectEndpoints({
  endpoints: builder => ({
    getState: builder.query({
      query: () => '/state/getAllStates',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: responseData => {
        const loadedForm = responseData.map(state => {
          state.id = state.id_state
          return state
        })
        return stateAdapter.setAll(initialState, loadedForm)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'State', id: 'LIST' },
            ...result.ids.map(id => ({ type: 'State', id: 'LIST' }))
          ]
        } else return [{ type: 'State', id: 'LIST' }]
      }
    }),
    getStatesByUser: builder.query({
      query: (args) => {
        const { idUser } = args
        return `/state/statesByUser/${idUser}`
      },
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: (responseData) => {
        const loadedForm = responseData.map(state => {
          state.id = state.id_state
          return state
        })
        return stateAdapter.setAll(initialState, loadedForm)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'State', id: 'LIST' },
            ...result.ids.map(id => ({ type: 'State', id: 'LIST' }))
          ]
        } else return [{ type: 'State', id: 'LIST' }]
      }
    })
  })
})

export const {
  useGetStateQuery,
  useGetStatesByUserQuery
} = stateApiSlice

export const selectStateResult = stateApiSlice.endpoints.getState.select()

const selectStateData = createSelector(
  selectStateResult,
  stateResult => stateResult.data
)

export const {
  selectAll: selectAllState,
  selectById: selectStateById,
  selectIds: selectStateIds
} = stateAdapter.getSelectors(state => selectStateData(state) ?? initialState)
