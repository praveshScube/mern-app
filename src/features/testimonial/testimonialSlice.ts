import { createSlice } from '@reduxjs/toolkit'
import { apiCallBegan } from '../middleware/api-creators'
import { showToastMessage } from '../../utils/helpers'

const initialState = {
    testimonialList: [],
    isLoading: false,
    testimonialData: {
        total_count: 0,
        total_active_users: 0,
    },

    isUserListLoading: false,
    metadata: {
        totaltestimonials: 0,
        totalPages: 0,
        total: 0,
    },

    userById: {},
    userLogs: [],
    userRolesDropdown: []
}

export const testimonialSlice = createSlice({
    name: 'testimonial',
    initialState,
    reducers: {
        testimonialListSuccess: (state, action) => {
            console.log(action, 'testimonialListSuccess')
            state.isUserListLoading = false
            // state.testimonialList = action.payload.data.data.data || []
            // state.metadata.totalPages = action?.payload?.data.meta?.last_page
            // state.metadata.total = action?.payload?.data?.meta?.total
            // state.metadata.totaltestimonials = action?.payload?.total_users
        },
        testimonialListPending: (state, action) => {
            state.isUserListLoading = true
        },
        testimonialListFailed: (state, action) => {
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
            //   state.usersData = action.payload.data
        },
        UsersDataPending: (state, action) => { },
        UsersDataFailed: (state, action) => {
            console.log('action:', action.payload)
        },
        RoleDropdownSuccess: (state, action) => {
            state.userRolesDropdown = action.payload.data
        },

    },
})

export const {
    testimonialListSuccess,
    testimonialListPending,
    testimonialListFailed,
    UserFetchedPending,
    UserFetchedSuccess,
    UserFetchedFailed,
    UserStatusSuccess,
    UserStatusFailed,
    UsersDataSuccess,
    UsersDataPending,
    UsersDataFailed,
    RoleDropdownSuccess
} = testimonialSlice.actions

export default testimonialSlice.reducer

export const testimonialListing = (data: any, page: any) =>
    apiCallBegan({
        url: `/admin/testimonials?status=${data.status}&search_key=${data.search_key}&rating=${data.rating}&start_date=${data.start_date}&end_date=${data.end_date}&page=${page}`,
        method: 'GET',
        data,
        onStart: testimonialListSuccess.type,
        onSuccess: testimonialListPending.type,
        onError: testimonialListFailed.type,
    })
