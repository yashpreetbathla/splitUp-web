import { createSlice } from "@reduxjs/toolkit";

const expensesSlice = createSlice({
  name: "expenses",
  initialState: null,
  reducers: {
    addExpenses: (state, action) => {
      return action.payload;
    },
    removeExpenses: (state, action) => {
      return null;
    },
  },
});

export const { addExpenses, removeExpenses } = expensesSlice.actions;

export default expensesSlice.reducer;
