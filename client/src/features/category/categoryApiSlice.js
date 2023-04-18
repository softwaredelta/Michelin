import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'

import { appSlice } from '../../app/api/apiSlice'

const categoryAdapter = createEntityAdapter({})

const initialState = categoryAdapter.getInitialState()

export const categoryApiSlice = appSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query({
      query: () => '/category/getAllQuestions',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: (responseData) => {
        const loadedQuestions = responseData.map((question) => {
          question.id = question.id_question
          return question
        })
        return categoryAdapter.setAll(initialState, loadedQuestions)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Question', id: 'LIST' },
            ...result.ids.map((id) => ({ tpye: 'Question', id: 'LIST' }))
          ]
        } else return [{ type: 'Question', id: 'LIST' }]
      }
    }),
    addNewQuestion: builder.mutation({
      query: (initialUserData) => ({
        url: 'category/postQuestion',
        method: 'POST',
        body: { ...initialUserData }
      }),
      invalidatesTags: [{ type: 'Question', id: 'LIST' }]
    }),
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
        return categoryAdapter.setAll(initialState, loadedCategories)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Category', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Category', id: 'LIST' }))
          ]
        } else return [{ type: 'Category', id: 'LIST' }]
      }
    })
  })
})

export const {
  useGetQuestionsQuery,
  useAddNewQuestionMutation,
  useGetCategoriesQuery
} = categoryApiSlice

export const selectQuestionResult =
  categoryApiSlice.endpoints.getQuestions.select()

const selectQuestionsData = createSelector(
  selectQuestionResult,
  (questionsResult) => questionsResult.data
)

export const selectCategoryResult =
  categoryApiSlice.endpoints.getCategories.select()

const selectCategoriesData = createSelector(
  selectCategoryResult,
  (categoriesResult) => categoriesResult.data
)

export const {
  selectAll: selectAllQuestions,
  selectById: selectQuestionById,
  selectIds: selectQuestionIds
} = categoryAdapter.getSelectors(
  (state) => selectQuestionsData(state) ?? initialState
)

export const {
  selectAll: selectAllCategories,
  selectById: selectCategoryById,
  selectIds: selectCategoryIds
} = categoryAdapter.getSelectors(
  (state) => selectCategoriesData(state) ?? initialState
)
