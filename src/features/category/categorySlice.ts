import { createSlice } from '@reduxjs/toolkit'
import { apiCallBegan } from '../middleware/api-creators'
import { showToastMessage } from './../../utils/helpers'

const initialState = {
    isLoading: false,
    metadata: {
        totalPages: 0,
        total: 0,
    },
    categoryDropdown: []

}

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        CategoryDropdownSuccess: (state, action) => {
            state.isLoading = false
            state.categoryDropdown = action.payload.data
        },
        CategoryDropdownPending: (state, action) => {
            state.isLoading = true
        },
        CategoryDropdownFailure: (state, action) => {
            state.isLoading = false
        },
    },
})

export const {
    CategoryDropdownSuccess,
    CategoryDropdownPending,
    CategoryDropdownFailure,

} = categorySlice.actions

export default categorySlice.reducer

export const fetchCategoriesDropdown = () =>
    apiCallBegan({
        url: `/admin/categories/dropdown`,
        method: 'GET',
        onStart: CategoryDropdownPending.type,
        onSuccess: CategoryDropdownSuccess.type,
        onError: CategoryDropdownFailure.type,
    })


