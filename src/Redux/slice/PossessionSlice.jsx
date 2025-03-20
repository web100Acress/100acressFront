import {createSlice} from "@reduxjs/toolkit";

const PossessionSlice = createSlice({
    name :"Possession",
    initialState:{
        Possessionin2025:[],
        Possessionin2026:[],
    },
    reducers :{
        Possessionin2025 :(state,action) =>{
            state.Possessionin2025 = action.payload;
        },
        Possessionin2026 :(state,action) =>{
            state.Possessionin2026 = action.payload;
        },
    }
});

export const {Possessionin2025,Possessionin2026} = PossessionSlice.actions;

export default PossessionSlice.reducer;