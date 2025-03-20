import { createSlice } from "@reduxjs/toolkit";

const PrimeLocationSlice = createSlice({
    name:"PrimeLocation",
    initialState:{
        sohnaroad : [],
        golfcourseroad : [],
        mgroad : [],
        nprroad : [],
        dwarkaexpressway : [],
        newgurgaon : [],
        sohna : [],
        sprroad : [],
        nh48 : [],
        golfcourseextensionroad : [],
    },
    reducers:{
        sohnaroad :(state, action) =>{
            state.sohnaroad = action.payload;
        },
        golfcourseroad :(state, action) =>{
            state.golfcourseroad = action.payload;
        },
        mgroad :(state, action) =>{
            state.mgroad = action.payload;
        },
        nprroad :(state, action) =>{
            state.nprroad = action.payload;
        },
        dwarkaexpressway :(state, action) =>{
            state.dwarkaexpressway = action.payload;
        },
        newgurgaon :(state, action) =>{
            state.newgurgaon = action.payload;
        },
        sohna:(state, action) =>{
            state.sohna = action.payload;
        },
        sprroad :(state, action) =>{
            state.sprroad = action.payload;
        },
        nh48 :(state, action) =>{
            state.nh48 = action.payload;
        },
        golfcourseextensionroad :(state, action) =>{
            state.golfcourseextensionroad = action.payload;
        }
    },
});

export const {sohnaroad,golfcourseextensionroad,golfcourseroad,mgroad,nprroad,dwarkaexpressway,newgurgaon,sohna,sprroad,nh48} = PrimeLocationSlice.actions;

export default PrimeLocationSlice.reducer;