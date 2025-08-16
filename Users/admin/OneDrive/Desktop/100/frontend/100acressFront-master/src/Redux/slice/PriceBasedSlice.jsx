import { createSlice } from "@reduxjs/toolkit";

const PriceBasedSlice = createSlice({
 name:"price",
 initialState:{
    minprice:[],
    maxprice:[],
    minpriceproject:[],
    maxpriceproject:[],
 },
 reducers :{
    minprice : (state,action) =>{
        state.minprice = action.payload;
    },
    maxprice :(state,action) =>{
        state.maxprice = action.payload;
    },
    minpriceproject : (state,action) =>{
        state.minpriceproject = action.payload;
    },
    maxpriceproject : (state,action) =>{
        state.maxpriceproject = action.payload;
    }
 }
});

export const {maxprice,minprice,minpriceproject,maxpriceproject} = PriceBasedSlice.actions;

export default PriceBasedSlice.reducer;
