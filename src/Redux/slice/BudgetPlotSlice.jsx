import { createSlice } from "@reduxjs/toolkit";

const BudgetPlotSlice = createSlice({
  name: "budgetplot",
  initialState: {
    bptp: [],
    orris:[],
    jms:[],
  },
  reducers: {
    bptp: (state, action) => {
      state.bptp = action.payload;
    },
    orris: (state, action) => {
        state.orris = action.payload;
    },
    jms: (state, action) => {
        state.lms = action.payload;
    },
  },
});

export const { bptp,orris,jms } = BudgetPlotSlice.actions;

export default BudgetPlotSlice.reducer;
