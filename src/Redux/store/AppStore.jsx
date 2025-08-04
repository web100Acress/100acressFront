import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "../slice/projectSlice.jsx";
import allUpcomingProjectReducer from "../slice/AllSectionData.jsx"; 
import stateprojectReducer from "../slice/StateProject.jsx";
import resaleReducer from "../slice/ResaleSlice.jsx";
import builderReducer from "../slice/BuilderSlice.jsx";
import projectStatusReducer from "../slice/ProjectstatusSlice.jsx";
import budgetplotReducer from "../slice/BudgetPlotSlice.jsx";
import primelocationReducer from "../slice/PrimeLocation.jsx";
import PossessionReducer from "../slice/PossessionSlice.jsx";
import ProjectOverviewReducer from "../slice/ProjectOverviewSlice.jsx";
import PriceBasedReducer from "../slice/PriceBasedSlice.jsx";
import projectOrderReducer from "../slice/ProjectOrderSlice.jsx";

const AppStore = configureStore({
    reducer: {
        project: projectReducer,
        stateproject: stateprojectReducer,
        allsectiondata: allUpcomingProjectReducer, 
        resaleproperty : resaleReducer,
        builder : builderReducer,
        projectStatus : projectStatusReducer,
        budgetplot: budgetplotReducer,
        primelocation : primelocationReducer,
        possession : PossessionReducer,
        ProjectOverview : ProjectOverviewReducer,
        PriceBased : PriceBasedReducer,
        projectOrder: projectOrderReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export default AppStore;
