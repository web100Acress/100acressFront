import { createSlice } from "@reduxjs/toolkit";

const ResaleSlice = createSlice({
    name:"ResaleData",
    initialState:{
        resale:[],
    },
    reducers:{
        resale :(state, action) =>{
            state.resale = action.payload;
        }
    },
});

export const {resale} = ResaleSlice.actions;

export default ResaleSlice.reducer;