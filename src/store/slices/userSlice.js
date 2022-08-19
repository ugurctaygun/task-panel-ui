import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    theme: "light",
  },
  reducers: {
    updateTheme(state, action) {
      state.theme = action.payload;
    },
  },
});

export const { updateTheme } = userSlice.actions;

export default userSlice.reducer;
