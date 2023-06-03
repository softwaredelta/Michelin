import {
  createSelector,
  createEntityAdapter
} from '@reduxjs/toolkit'

import { appSlice } from '../../app/api/apiSlice'
/*
 * Link a requerimientos funcionales:
 * https://docs.google.com/spreadsheets/d/1Eme0YIj9GZCc3QCBQehDUGZIgS7aTilZx4oUy35dcGc/edit?usp=sharing
 */
// M9_H2
const usersAdapter = createEntityAdapter({})

const initialState = usersAdapter.getInitialState()

export const usersApiSlice = appSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query({
      query: () => '/user/list',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: responseData => {
        const loadedUsers = responseData.map(user => {
          user.id = user.id_user
          return user
        })
        return usersAdapter.setAll(initialState, loadedUsers)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'User', id: 'LIST' },
            ...result.ids.map(id => ({ tpye: 'User', id: 'LIST' }))
          ]
        } else return [{ type: 'User', id: 'LIST' }]
      }
    }),
    loginUser: builder.mutation({
      query: userData => ({
        url: '/user/login',
        method: 'POST',
        body: { ...userData }
      }),
      transformResponse: responseData => {
        localStorage.setItem('token', responseData.token) // eslint-disable-line
        localStorage.setItem('mail', responseData.mail) // eslint-disable-line
        localStorage.setItem('name', responseData.name) // eslint-disable-line
        localStorage.setItem('lastName', responseData.lastName) // eslint-disable-line
        localStorage.setItem('role', responseData.role) // eslint-disable-line
        return true
      },
      invalidatesTags: [
        { type: 'User', id: 'LIST' }
      ]
    }),
    addNewUser: builder.mutation({
      query: initialUserData => ({
        url: '/user/signup',
        method: 'POST',
        body: initialUserData
      }),
      invalidatesTags: [
        { type: 'User', id: 'LIST' }
      ]
    }),
    editUser: builder.mutation({
      query: userData => ({
        url: '/user/edit',
        method: 'POST',
        body: { ...userData }
      }),
      invalidatesTags: [
        { type: 'User', id: 'LIST' }
      ]
    }),
    newUserPassword: builder.mutation({
      query: userData => ({
        url: '/user/newPassword',
        method: 'POST',
        body: { ...userData }
      }),
      invalidatesTags: [
        { type: 'User', id: 'LIST' }
      ]
    }),
    getRoles: builder.query({
      query: () => '/user/role',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: (responseData) => {
        const loadedRoles = responseData.map((role) => {
          role.id = role.id_role
          return role
        })
        return usersAdapter.setAll(initialState, loadedRoles)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Role', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Role', id: 'LIST' }))
          ]
        } else return [{ type: 'Role', id: 'LIST' }]
      }
    }),
    getManagers: builder.query({
      query: () => '/user/managers',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: (responseData) => {
        const loadedManagers = responseData.map((manager) => {
          manager.id = manager.id_user
          return manager
        })
        return usersAdapter.setAll(initialState, loadedManagers)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Manager', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Manager', id: 'LIST' }))
          ]
        } else return [{ type: 'Manager', id: 'LIST' }]
      }
    }),
    deleteUser: builder.mutation({
      query: initialUserData => ({
        url: '/user/delete',
        method: 'POST',
        body: initialUserData
      }),
      invalidatesTags: [
        { type: 'User', id: 'LIST' }
      ]
    })
  })
})

export const {
  useGetUsersQuery,
  useAddNewUserMutation,
  useEditUserMutation,
  useNewUserPasswordMutation,
  useGetRolesQuery,
  useGetManagersQuery,
  useLoginUserMutation,
  useDeleteUserMutation
} = usersApiSlice

export const selectUsersResult = usersApiSlice.endpoints.getUsers.select()

const selectUsersData = createSelector(
  selectUsersResult,
  usersResult => usersResult.data
)

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)
