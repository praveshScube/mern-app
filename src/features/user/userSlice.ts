import { createSlice } from '@reduxjs/toolkit'
import { apiCallBegan } from '../middleware/api-creators'
import { showToastMessage } from './../../utils/helpers'

const initialState = {
  userList: [],
  isLoading: false,
  usersData: {
    total_count: 0,
    total_active_users: 0,
  },

  isUserListLoading: false,
  metadata: {
    totalUsers: 0,
    totalPages: 0,
    total: 0,
  },

  userById: {},
  userLogs: [],
  userRolesDropdown:[]
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    UserListSuccess: (state, action) => {
      state.isUserListLoading = false
      state.userList = action.payload.data.data || []
      state.metadata.totalPages = action?.payload?.data.meta?.last_page
      state.metadata.total = action?.payload?.data?.meta?.total
      state.metadata.totalUsers = action?.payload?.total_users
    },
    UserListPending: (state, action) => {
      state.isUserListLoading = true
    },
    UserListFailed: (state, action) => {
      state.isUserListLoading = false
    },

    UserFetchedPending: (state, action) => {
      console.log('action:', action)
      state.isLoading = true
    },
    UserFetchedSuccess: (state, action) => {
      console.log('userById:', action?.payload?.data)
      state.userById = action?.payload?.data
      state.isLoading = false
    },
    UserFetchedFailed: (state, action) => {
      state.isLoading = false
    },

    UserStatusSuccess: (state, action) => {
      showToastMessage(action.payload.data.message, 'success')
    },
    UserStatusFailed: (state, action) => {
      showToastMessage(action.payload.message, 'error')
    },

    // User Analytics
    UsersDataSuccess: (state, action) => {
      state.usersData = action.payload.data
    },
    UsersDataPending: (state, action) => {},
    UsersDataFailed: (state, action) => {
      console.log('action:', action.payload)
    },
    RoleDropdownSuccess: (state, action) => {
      state.userRolesDropdown = action.payload.data
    },
  
  },
})

export const {
  UserListSuccess,
  UserListPending,
  UserListFailed,
  UserFetchedPending,
  UserFetchedSuccess,
  UserFetchedFailed,
  UserStatusSuccess,
  UserStatusFailed,
  UsersDataSuccess,
  UsersDataPending,
  UsersDataFailed,
  RoleDropdownSuccess
} = userSlice.actions

export default userSlice.reducer

export const fetchUsers = (data: any,page:any) =>
  apiCallBegan({
    url: `/admin/users?status=${data.status}&search_key=${data.search_key}&role_id=${data.role_id|| ''}&page=${page}`,
    method: 'GET',
    data,
    onStart: UserListPending.type,
    onSuccess: UserListSuccess.type,
    onError: UserListFailed.type,
  })

export const fetchUserById = (id: any) =>
  apiCallBegan({
    url: `/admin/users/${id}`,
    method: 'GET',
    onStart: UserFetchedPending.type,
    onSuccess: UserFetchedSuccess.type,
    onError: UserFetchedFailed.type,
  })

export const UpdateUserStatus = (id: any, data: any) =>
  apiCallBegan({
    url: `/admin/users/update-status/${id}`,
    method: 'PATCH',
    data,
    onSuccess: UserStatusSuccess.type,
    onError: UserStatusFailed.type,
  })

// Users Analytics
export const fetchUsersAnalytics = () =>
  apiCallBegan({
    url: `/admin/users/stats`,
    method: 'GET',
    onSuccess: UsersDataSuccess.type,
    onStart: UsersDataPending.type,
    onError: UsersDataFailed.type,
  })

  export const fetchUserRoleDropdown = () =>
  apiCallBegan({
    url: '/admin/roles/dropdown',
    method: 'GET',
    onSuccess: RoleDropdownSuccess.type,
  })
