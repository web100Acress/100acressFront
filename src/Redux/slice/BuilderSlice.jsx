import { createSlice } from "@reduxjs/toolkit";

const builderslice = createSlice({
  name: "project",
  initialState: {
    signatureglobal: [],
    m3m:[],
    dlf:[],
    experion:[],
    elan:[],
    bptp:[],
    adani:[],
    smartworld:[],
    trevoc:[],
    indiabulls:[],
    centralpark:[],
    emaarindia:[],
    godrej:[],
    whiteland:[],
    aipl:[],
  },
  reducers: {
    signatureglobal: (state, action) => {
      state.signatureglobal = action.payload;
    },
    m3m: (state, action) => {
        state.m3m = action.payload;
    },
    dlf: (state, action) => {
        state.dlf = action.payload;
    },
    experion: (state, action) => {
        state.experion = action.payload;
    },
    elan: (state, action) => {
        state.elan = action.payload;
    },
    bptp: (state, action) => {
        state.bptp = action.payload;
    },
    adani: (state, action) => {
        state.adani = action.payload;
    },
    smartworld: (state, action) => {
        state.smartworld = action.payload;
    },
    trevoc: (state, action) => {
        state.trevoc = action.payload;
    },
    indiabulls:(state,action) =>{
        state.indiabulls = action.payload;
    },
    centralpark:(state,action) =>{
        state.centralpark = action.payload;
    },
    emaarindia:(state,action) =>{
        state.emaarindia = action.payload;
    },
    godrej:(state,action) =>{
        state.godrej = action.payload;
    },
    whiteland:(state,action) =>{
        state.whiteland = action.payload;
    },
    aipl:(state,action) =>{
        state.aipl = action.payload;
    }
  },
});

export const { signatureglobal,m3m,dlf,experion,elan,bptp,adani,smartworld,trevoc,indiabulls,centralpark,emaarindia,godrej,whiteland,aipl} = builderslice.actions;

export default builderslice.reducer;
