import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios"
import reducer from "../reducer/propertyReducer";

const AppContext = createContext();

// const API = "https://api.100acress.com/newlaunch/viewAll";

const API = "https://acre.onrender.com/property/viewAll";
const APIPRE ="https://acre.onrender.com/preLaunch/viewAll";

// const APIPRE = "https://acre.onrender.com/property/viewAll";

const initialState ={
    isLoading: false,
    isError: false,
    Properties:[],
    featureProperties: [],
    isSingleLoading: false,
    singleProperty: {},
    isPreLaunchLoading: false,
    PreLaunchProperties:[],
    PreLuanchFeatProperties:[],
    PreLuanchSimilarProperties:[],
    PreLuanchByBuilder:[],
}

const AppProvider =({children}) => {
    const [state,dispatch] = useReducer(reducer,initialState);
    
    const getProducts = async (url) =>{
        dispatch({type:"SET_LOADING"})
        try {
            const res = await axios.get(url);
            const products =await res.data;
            dispatch({type:"ALL_PROPERTY_DATA",payload: products}) 
        } catch (error) {
            dispatch({type:"API_ERROR"});
        }
    }

    const getSingleProduct = async (url) =>{ 
        dispatch({type:"SET_SINGLE_LOADING"})
        try {
            const res = await axios.get(url);
            const singleProperty =await res.data?.data[0];
            console.log(singleProperty,"Hello")
            dispatch({type:"GET_SINGLE_PRODUCT",payload: singleProperty})
        } catch (error) {
            dispatch({type:"SET_SINGLE_ERROR"})
        }
    }
    const getPreLaunchProducts = async (url) =>{
        dispatch({type:"SET_PRE_LAUNCH_SINGLE_LOADING"})
        try {
            const res = await axios.get(url);
            const PreLaunchProperty =await res.data?.data;
            dispatch({type:"ALL_PRELAUNCH_PRODUCTS",payload: PreLaunchProperty})
        } catch (error) {
            dispatch({type:"PRELAUNCHH_API_ERROR"})
        }
    }
    
    useEffect(()=>{
        getProducts(API);
        getPreLaunchProducts(APIPRE);
    },[])
    return (
        <AppContext.Provider value={{...state,getSingleProduct}}>
          {children}
        </AppContext.Provider>
    )
};


const useProductContext = () =>{
    return useContext(AppContext);
}

export {AppProvider,AppContext,useProductContext};