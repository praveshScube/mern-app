import { createSlice } from '@reduxjs/toolkit'
import { apiCallBegan } from '../middleware/api-creators'
import { showToastMessage } from './../../utils/helpers'

const initialState = {
    isLoading: false,
    metadata: {
        totalCount: 0,
        totalPages: 0,
        total: 0,
    },
    productCategoryDropdown: [],
    productListing:[],

}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        ProductDropdownSuccess: (state, action) => {
            state.isLoading = false
            state.productCategoryDropdown = action.payload
        },
        ProductListingSuccess: (state, action) => {
        //    console.log(action.payload.total_count, "product listing")
            state.isLoading = false
            state.productListing = action.payload.data.data
            state.metadata.totalCount = action.payload.total_count
            state.metadata.totalPages = action.payload.data.meta.last_page
            state.metadata.total = action.payload.data.meta.total
        },
        ProductDropdownPending: (state, action) => {
            state.isLoading = true
        },
        ProductDropdownFailure: (state, action) => {
            state.isLoading = false
        },
    },
})

export const {
    ProductDropdownSuccess,
    ProductDropdownPending,
    ProductDropdownFailure,
    ProductListingSuccess,

} = productSlice.actions

export default productSlice.reducer

export const fetchProductCategoriesDropdown = () =>
    apiCallBegan({
        url: `/admin/products/prerequisite/categories`,
        method: 'GET',
        onStart: ProductDropdownPending.type,
        onSuccess: ProductDropdownSuccess.type,
        onError: ProductDropdownFailure.type,
    })

    export const fetchProductListing = (params:any,page:any) =>
    apiCallBegan({
        url: `/admin/products?page=${page}&start_date=${params.start_date}&end_date=${params.end_date}&category_id=${params.category}&sub_category_id=${params.sub_category}&status=${params.status}&search_key=${params.search_key}`,
        method: 'GET',
        onStart: ProductDropdownPending.type,
        onSuccess: ProductListingSuccess.type,
        onError: ProductDropdownFailure.type,
    })


