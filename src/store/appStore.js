import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import groupReducer from "./slices/groupSlice";
import expensesReducer from "./slices/expensesSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    group: groupReducer,
    expenses: expensesReducer,
  },
});

export default store;
