import { createSlice } from "@reduxjs/toolkit";

const AllSectionDataSlice = createSlice({
    name: "AllSectionData",
    initialState: {
        allupcomingproject: [],
        newlaunch:[],
        underconstruction:[],
        readytomove:[],
        possessionafter2026:[],
        commercialProjectAll:[],
        scoplotsall:[],
        luxuryAll:[],
        deendayalplots:[],
        residential:[],
        builderindependentfloor:[],
        luxuryvillas:[],
        dlfsco:[],
        plotsingurugram:[],
        farmhouse:[],
        industrialplots:[],
        industrialprojects:[],
    },
    reducers: {
        allupcomingproject: (state, action) => {
            state.allupcomingproject = action.payload;
        },
        newlaunch: (state, action) => {
            state.newlaunch = action.payload;
        },
        underconstruction:(state,action) =>{
            state.underconstruction= action.payload;
        },
        readytomove:(state,action) =>{
            state.readytomove = action.payload;
        },
        possessionafter2026:(state,action) =>{
            state.possessionafter2026 = action.payload;
        },
        commercialProjectAll:(state,action)=>{
            state.commercialProjectAll = action.payload;
        },
        scoplotsall:(state,action)=>{
            state.scoplotsall = action.payload;
        },
        luxuryAll:(state,action) =>{
            state.luxuryAll = action.payload;
        },
        deendayalplots:(state,action)=>{
            state.deendayalplots = action.payload;
        },
        residential:(state,action) =>{
            state.residential = action.payload;
        },
        builderindependentfloor:(state,action) =>{
            state.builderindependentfloor = action.payload;
        },
        luxuryvillas:(state,action) =>{
            state.luxuryvillas = action.payload;
        },
        dlfsco:(state,action)=>{
            state.dlfsco = action.payload;
        },
        plotsingurugram:(state,action)=>{
            state.plotsingurugram = action.payload;
        },
        farmhouse:(state,action)=>{
            state.farmhouse = action.payload;
        },
        industrialplots:(state,action)=>{
            state.industrialplots = action.payload;
        },
        industrialprojects:(state,action)=>{
            state.industrialprojects = action.payload;
        }

    },
});

export const { allupcomingproject,newlaunch,underconstruction,readytomove,commercialProjectAll,scoplotsall,luxuryAll,deendayalplots,residential,builderindependentfloor,luxuryvillas,dlfsco,possessionafter2026,plotsingurugram,farmhouse,industrialplots,industrialprojects } = AllSectionDataSlice.actions; 

export default AllSectionDataSlice.reducer;
