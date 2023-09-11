import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import employeeSlice from "./employeeSlice";
import manageDeviceSlice from "./manageDeviceSlice";
import userReducer from './user/userSlice'
import testimonialReducer from './testimonial/testimonialSlice'
import leadReducer from './lead/leadSlice'
import categoryReducer from './category/categorySlice'
import productSlice from "./product/productSlice";

export default combineReducers({
    auth: authReducer,
    employee: employeeSlice,
    device: manageDeviceSlice,
    user: userReducer,
    testimonial: testimonialReducer,
    lead: leadReducer,
    category: categoryReducer,
    product: productSlice,
});
