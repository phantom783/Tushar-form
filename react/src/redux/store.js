/* Redux Store Configuration */
import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./slices/employeeSlice";
import salaryReducer from "./slices/salarySlice";

export const store = configureStore({
  reducer: {
    employees: employeeReducer,
    salaries: salaryReducer,
  },
});

export default store;
