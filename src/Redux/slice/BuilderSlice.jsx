import { createSlice } from "@reduxjs/toolkit";

const builderSlice = createSlice({
  name: "builder",
  initialState: {
    signatureglobal: [],
    m3m: [],
    dlf: [],
    experion: [],
    elan: [],
    bptp: [],
    adani: [],
    smartworld: [],
    trevoc: [],
    indiabulls: [],
    centralpark: [],
    emaarindia: [],
    godrej: [],
    whiteland: [],
    aipl: [],
    birla: [],
    sobha: [],
    trump: [],
    puri: [],
    aarize: [],
    maxestates: [],
    shapoorji: [],
    satya: [],
    danube: [],
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
    indiabulls: (state, action) => {
      state.indiabulls = action.payload;
    },
    centralpark: (state, action) => {
      state.centralpark = action.payload;
    },
    emaarindia: (state, action) => {
      state.emaarindia = action.payload;
    },
    godrej: (state, action) => {
      state.godrej = action.payload;
    },
    whiteland: (state, action) => {
      state.whiteland = action.payload;
    },
    aipl: (state, action) => {
      state.aipl = action.payload;
    },
    birla: (state, action) => {
      state.birla = action.payload;
    },
    sobha: (state, action) => {
      state.sobha = action.payload;
    },
    trump: (state, action) => {
      state.trump = action.payload;
    },
    puri: (state, action) => {
      state.puri = action.payload;
    },
    aarize: (state, action) => {
      state.aarize = action.payload;
    },
    maxestates: (state, action) => {
      state.maxestates = action.payload;
    },
    shapoorji: (state, action) => {
      state.shapoorji = action.payload;
    },
    satya: (state, action) => {
      state.satya = action.payload;
    },
    danube: (state, action) => {
      state.danube = action.payload;
    },
  },
});

export const { 
  signatureglobal, 
  m3m, 
  dlf, 
  experion, 
  elan, 
  bptp, 
  adani, 
  smartworld, 
  trevoc, 
  indiabulls, 
  centralpark, 
  emaarindia, 
  godrej, 
  whiteland, 
  aipl, 
  birla, 
  sobha, 
  trump, 
  puri, 
  aarize, 
  maxestates,
  shapoorji,
  satya,
  danube
} = builderSlice.actions;

export default builderSlice.reducer;










