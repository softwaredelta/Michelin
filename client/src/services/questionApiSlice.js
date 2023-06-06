import { createEntityAdapter } from '@reduxjs/toolkit'

import { appSlice } from '../app/api/apiSlice'

const questionAdapter = createEntityAdapter({})

const initialState = questionAdapter.getInitialState()

export const questionApiSlice = appSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuestionsBySection: builder.query({
      query: (args) => {
        const { idCategory, idSection } = args
        return `/question/bySection/${idCategory}/${idSection}`
      },
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: (responseData) => {
        const loadedQuestions = responseData.map((question) => {
          question.id = question.id_question
          return question
        })
        return questionAdapter.setAll(initialState, loadedQuestions)
      },
      providesTags: (result, error, args) => {
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
        url: '/question/postQuestion',
        method: 'POST',
        body: initialUserData
      }),
      invalidatesTags: [{ type: 'Question', id: 'LIST' }]
    }),
    editQuestion: builder.mutation({
      query: editedUserData => ({
        url: '/question/edit',
        method: 'POST',
        body: { ...editedUserData }
      }),
      invalidatesTags: [{ type: 'Question', id: 'LIST' }]
    }),
    deleteQuestion: builder.mutation({
      query: (initialUserData) => ({
        url: '/question/deleteQuestion',
        method: 'POST',
        body: initialUserData
      }),
      invalidatesTags: [{ type: 'Question', id: 'LIST' }]
    })
  })
})

export const {
  useGetQuestionsBySectionQuery,
  useAddNewQuestionMutation,
  useEditQuestionMutation,
  useDeleteQuestionMutation
} = questionApiSlice
