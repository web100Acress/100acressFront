import { createSlice } from "@reduxjs/toolkit";

const StateProjectSlice = createSlice({
  name: "project",
  initialState: {
    gurugram: [],
    delhi:[],
    noida:[],
    goa:[],
    ayodhya:[],
    mumbai:[],
    panipat:[],
    panchkula:[],
    sonipat:[],
    kasauli:[],
    karnal:[],
    jalandhar:[],
    dubai : [],
  },
  reducers: {
    gurugram: (state, action) => {
      state.gurugram = action.payload;
    },
    delhi: (state, action) => {
        state.delhi = action.payload;
    },
    noida: (state, action) => {
        state.noida = action.payload;
    },
    goa: (state, action) => {
        state.goa = action.payload;
    },
    sonipat: (state, action) => {
        state.sonipat = action.payload;
    },
    ayodhya: (state, action) => {
        state.ayodhya = action.payload;
    },
    mumbai: (state, action) => {
        state.mumbai = action.payload;
    },
    panipat: (state, action) => {
        state.panipat = action.payload;
    },
    panchkula: (state, action) => {
        state.panchkula = action.payload;
    },
    kasauli: (state, action) => {
        state.kasauli = action.payload;
    },
    karnal:(state,action) =>{
        state.karnal = action.payload;
    },
    jalandhar:(state,action) =>{
        state.jalandhar = action.payload;
    },
    dubai:(state,action) =>{
        state.dubai = action.payload;
    },
  },
});

export const {gurugram,delhi,noida,goa,ayodhya,mumbai,panipat,panchkula,kasauli,karnal,jalandhar,sonipat, dubai} = StateProjectSlice.actions;

export default StateProjectSlice.reducer;
