import {
  createSelector,
  createEntityAdapter
} from '@reduxjs/toolkit'

import { appSlice } from '../../app/api/apiSlice'

const categoryAdapter = createEntityAdapter({})

const initialState = categoryAdapter.getInitialState()

export const categoryApiSlice = appSlice.injectEndpoints({
  endpoints: builder => ({
    getQuestions: builder.query({
      query: () => '/category/getAllQuestions',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: responseData => {
        const loadedQuestions = responseData.map(question => {
          question.id = question.id_question
          return question
        })
        return categoryAdapter.setAll(initialState, loadedQuestions)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Question', id: 'LIST' },
            ...result.ids.map(id => ({ tpye: 'Question', id: 'LIST' }))
          ]
        } else return [{ type: 'Question', id: 'LIST' }]
      }
    }),
    addNewQuestion: builder.mutation({
      query: initialUserData => ({
        url: 'category/postQuestion',
        method: 'POST',
        body: initialUserData
      }),
      invalidatesTags: [
        { type: 'Question', id: 'LIST' }
      ]
    })
  })
})

export const {
  useGetQuestionsQuery,
  useAddNewQuestionMutation
} = categoryApiSlice

export const selectQuestionResult = categoryApiSlice.endpoints.getQuestions.select()

const selectQuestionsData = createSelector(
  selectQuestionResult,
  questionsResult => questionsResult.data)

export const {
  selectAll: selectAllQuestions,
  selectById: selectQuestionById,
  selectIds: selectQuestionIds
} = categoryAdapter.getSelectors(state => selectQuestionsData(state) ?? initialState)
