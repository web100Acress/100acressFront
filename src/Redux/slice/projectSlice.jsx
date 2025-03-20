import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    trending: [],
    spotlight:[],
    featured:[],
    upcoming:[],
    affordable:[],
    luxury:[],
    scoplots:[],
    commercial:[],
    budget:[],
    projectindelhi:[],
  },
  reducers: {
    trending: (state, action) => {
      state.trending = action.payload;
    },
    spotlight: (state, action) => {
        state.spotlight = action.payload;
    },
    featured: (state, action) => {
        state.featured = action.payload;
    },
    upcoming: (state, action) => {
        state.upcoming = action.payload;
    },
    affordable: (state, action) => {
        state.affordable = action.payload;
    },
    luxury: (state, action) => {
        state.luxury = action.payload;
    },
    scoplots: (state, action) => {
        state.scoplots = action.payload;
    },
    commercial: (state, action) => {
        state.commercial = action.payload;
    },
    budget: (state, action) => {
        state.budget = action.payload;
    },
    projectindelhi:(state,action) =>{
        state.projectindelhi = action.payload;
    }
  },
});

export const { trending,spotlight,featured,upcoming,affordable,luxury,scoplots,commercial,budget,projectindelhi } = projectSlice.actions;

export default projectSlice.reducer;
