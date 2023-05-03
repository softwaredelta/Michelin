import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'

import { appSlice } from '../../app/api/apiSlice'

const sectionAdapter = createEntityAdapter({})

const initialState = sectionAdapter.getInitialState()

export const sectionApiSlice = appSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => '/category/getAllCategories',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: (responseData) => {
        const loadedCategories = responseData.map((category) => {
          category.id = category.id_category
          return category
        })
        return sectionAdapter.setAll(initialState, loadedCategories)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Category', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Category', id: 'LIST' }))
          ]
        } else return [{ type: 'Category', id: 'LIST' }]
      }
    }),
    getAreasBySection: builder.query({
      query: (args) => {
        const { idSection } = args
        return `/section/getAreasBySection/${idSection}`
      },
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: (responseData) => {
        const loadedAreas = responseData.map((area) => {
          area.id = area.id_area
          return area
        })
        return sectionAdapter.setAll(initialState, loadedAreas)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Area', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Area', id: 'LIST' }))
          ]
        } else return [{ type: 'Area', id: 'LIST' }]
      }
    }),
    getArea: builder.query({
      query: () => '/section/getAreas',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: (responseData) => {
        const loadedAreas = responseData.map((area) => {
          area.id = area.id_area
          return area
        })
        return sectionAdapter.setAll(initialState, loadedAreas)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Area', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Area', id: 'LIST' }))
          ]
        } else return [{ type: 'Area', id: 'LIST' }]
      }
    }),
    getSections: builder.query({
      query: () => '/section/getSections',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: (responseData) => {
        const loadedSections = responseData.map((section) => {
          section.id = section.id_section
          return section
        })
        return sectionAdapter.setAll(initialState, loadedSections)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Section', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Section', id: 'LIST' }))
          ]
        } else return [{ type: 'Section', id: 'LIST' }]
      }
    })
  })
})

export const {
  useGetCategoriesQuery,
  useGetAreaQuery,
  useGetSectionsQuery,
  useGetAreasBySectionQuery
} = sectionApiSlice

export const selectCategoryResult =
  sectionApiSlice.endpoints.getCategories.select()

const selectCategoriesData = createSelector(
  selectCategoryResult,
  (categoriesResult) => categoriesResult.data
)

export const {
  selectAll: selectAllCategories,
  selectById: selectCategoryById,
  selectIds: selectCategoryIds
} = sectionAdapter.getSelectors(
  (state) => selectCategoriesData(state) ?? initialState
)
