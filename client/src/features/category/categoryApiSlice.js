import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'

import { appSlice } from '../../app/api/apiSlice'

const categoryAdapter = createEntityAdapter({})

const initialState = categoryAdapter.getInitialState()

export const categoryApiSlice = appSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query({
      query: () => '/question/getAllQuestions',
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
            ...result.ids.map((id) => ({ type: 'Question', id: 'LIST' }))
          ]
        } else return [{ type: 'Question', id: 'LIST' }]
      }
    }),
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
        return categoryAdapter.setAll(initialState, loadedQuestions)
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
        return categoryAdapter.setAll(initialState, loadedAreas)
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
        return categoryAdapter.setAll(initialState, loadedAreas)
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
        return categoryAdapter.setAll(initialState, loadedSections)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Section', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Section', id: 'LIST' }))
          ]
        } else return [{ type: 'Section', id: 'LIST' }]
      }
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
  useGetQuestionsQuery,
  useGetQuestionsBySectionQuery,
  useAddNewQuestionMutation,
  useEditQuestionMutation,
  useGetCategoriesQuery,
  useGetAreaQuery,
  useGetSectionsQuery,
  useDeleteQuestionMutation,
  useGetAreasBySectionQuery
} = categoryApiSlice

export const selectQuestionResult =
  categoryApiSlice.endpoints.getQuestions.select()

const selectQuestionsData = createSelector(
  selectQuestionResult,
  (questionsResult) => questionsResult.data
)

export const selectQuestionsBySectionResult =
  categoryApiSlice.endpoints.getQuestionsBySection.select()

const selectQuestionsBySectionData = createSelector(
  selectQuestionsBySectionResult,
  (questionsResult) => questionsResult.data
)

export const selectCategoryResult =
  categoryApiSlice.endpoints.getCategories.select()

const selectCategoriesData = createSelector(
  selectCategoryResult,
  (categoriesResult) => categoriesResult.data
)

export const selectAreaResult =
  categoryApiSlice.endpoints.getArea.select()

const selectAreaData = createSelector(
  selectAreaResult,
  (areasResult) => areasResult.data
)

export const selectSectionResult =
  categoryApiSlice.endpoints.getSections.select()

const selectSectionData = createSelector(
  selectSectionResult,
  (sectionsResult) => sectionsResult.data
)

export const {
  selectAll: selectAllQuestions,
  selectById: selectQuestionById,
  selectIds: selectQuestionIds
} = categoryAdapter.getSelectors(
  (state) => selectQuestionsData(state) ?? initialState
)

export const {
  selectAll: selectAllQuestionsBySection,
  selectById: selectQuestionByIdAndSection,
  selectIds: selectQuestionIdsBySection
} = categoryAdapter.getSelectors(
  (state) => selectQuestionsBySectionData(state) ?? initialState
)

export const {
  selectAll: selectAllCategories,
  selectById: selectCategoryById,
  selectIds: selectCategoryIds
} = categoryAdapter.getSelectors(
  (state) => selectCategoriesData(state) ?? initialState
)

export const {
  selectAll: selectAllAreass,
  selectById: selectAreaById,
  selectIds: selectAreaIds
} = categoryAdapter.getSelectors(
  (state) => selectAreaData(state) ?? initialState
)

export const {
  selectAll: selectAllSections,
  selectById: selectSectionById,
  selectIds: selectSectionIds
} = categoryAdapter.getSelectors(
  (state) => selectSectionData(state) ?? initialState
)
