import { createSlice } from "@reduxjs/toolkit";

const ProjectOverviewSlice = createSlice({
    name: "projectoverview",
    initialState:{
        orrisplots:[],
        bptpplots:[],
    },
    reducers :{
        orrisplots :(state,action) =>{
            state.orrisplots = action.payload;
        },
        bptpplots : (state,action) =>{
            state.bptpplots = action.payload;
        }
    }
});

export const {orrisplots,bptpplots} = ProjectOverviewSlice.actions;
export default ProjectOverviewSlice.reducer;