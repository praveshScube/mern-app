import { createSlice } from '@reduxjs/toolkit'
import { apiCallBegan } from '../middleware/api-creators'
import { showToastMessage } from './../../utils/helpers'
import moment from 'moment'

const initialState = {
    leadsList: [],
    isLoading: false,
    metadata: {
        totalPages: 0,
        total: 0,
    },
    leadStats: {}

}

export const leadSlice = createSlice({
    name: 'lead',
    initialState,
    reducers: {
        LeadListSuccess: (state, action) => {
            state.isLoading = false
            state.leadsList = action.payload.data.data || []
            state.metadata.totalPages = action?.payload?.data.meta?.last_page
            state.metadata.total = action?.payload?.data?.meta?.total
        },
        LeadListPending: (state, action) => {
            state.isLoading = true
        },
        LeadListFailure: (state, action) => {
            state.isLoading = false
        },

        AnalyticsSuccess: (state, action) => {
            state.leadStats = action.payload.data
        },
        AnalyticsFailure: (state, action) => {
            state.isLoading = false
        },


    },
})

export const {
    LeadListSuccess,
    LeadListPending,
    LeadListFailure,
    AnalyticsSuccess,
    AnalyticsFailure

} = leadSlice.actions

export default leadSlice.reducer

export const fetchLeads = (data: any, page: any) =>
    apiCallBegan({
        url: `/admin/leads?page=${page}&start_date=${data.start_date}&end_date=${data.end_date}&search_key=${data.search_key}&status=${data.status}&lead_type=${data.lead_type}`,
        method: 'GET',
        data,
        onStart: LeadListPending.type,
        onSuccess: LeadListSuccess.type,
        onError: LeadListFailure.type,
    })


export const fetchLeadAnalytics = (data: any) =>
    apiCallBegan({
        url: `/admin/leads/stats?start_date=${moment(data.start_date).format('YYYY-MM-DD') === 'Invalid date' ? '' : moment(data.start_date).format('YYYY-MM-DD')}&end_date=${moment(data.end_date).format('YYYY-MM-DD') === 'Invalid date' ? '' : moment(data.end_date).format('YYYY-MM-DD')}`,
        method: 'GET',
        onSuccess: AnalyticsSuccess.type,
        onError: AnalyticsFailure.type,
    })