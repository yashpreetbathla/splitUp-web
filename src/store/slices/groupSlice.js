import { createSlice } from "@reduxjs/toolkit";

const groupSlice = createSlice({
  name: "group",
  initialState: null,
  reducers: {
    addGroup: (state, action) => {
      return action.payload;
    },
    removeGroup: (state, action) => {
      return null;
    },
  },
});

export const { addGroup, removeGroup } = groupSlice.actions;

export default groupSlice.reducer;
