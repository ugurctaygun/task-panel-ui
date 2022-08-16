import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    value: {
      taskList: [],
    },
  },
  reducers: {
    updateState: (state, action) => {
      state.value = { ...action.payload };
    },
  },
});

export const { updateState } = taskSlice.actions;

export default taskSlice.reducer;
