import { createSlice } from "@reduxjs/toolkit";

const projectstatusSlice = createSlice({
  name: "project",
  initialState: {
    emaar: [],
  },
  reducers: {
    emaar: (state, action) => {
      state.emaar = action.payload;
    },
  },
});

export const { emaar } = projectstatusSlice.actions;

export default projectstatusSlice.reducer;
