const PropertyReducer =(state, action) =>{
    // if(action.type === "SET_LOADING"){
    //     return {
    //         ...state,
    //         isLoading:true,
    //     }
    // }
    // if(action.type === "API_ERROR"){
    //     return {
    //         ...state,
    //         isLoading:true,
    //         isError:true,
    //     }
    // }

    switch(action.type){
        case "SET_LOADING":
            return {
                ...state,
                isLoading:true,
            }
        
        case "SET_SINGLE_LOADING":
            return {
                ...state,
                isSingleLoading:true,
            }
        case "SET_PRE_LAUNCH_SINGLE_LOADING":
            return {
                ...state,
                isPreLaunchLoading:true,
            }

        case "ALL_PROPERTY_DATA":
            // const featureData = action.payload.filter((currElem)=>{
            //     return currElem.featured === true;
            // })

            return {
                ...state,
                isLoading: false,
                Properties:action.payload,
            }

        case "GET_SINGLE_PRODUCT":
            return {
                ...state,
                singleProperty:action.payload,
                isSingleLoading: false,
            }
        
        case "ALL_PRELAUNCH_PRODUCTS":
            let cleanedPayload = action.payload;

            if (Array.isArray(cleanedPayload) && cleanedPayload[0] === null) {
                cleanedPayload.shift();
              }

            const featuredData=cleanedPayload.filter((elem)=>{
                return elem.featured ==="true";
            })
            const featuredSimilarData=cleanedPayload.filter((elem)=>{
                return elem.featured ==="false";
            })
            const TarcSimilarData = cleanedPayload
              .filter((elem) => elem.featured === "featured")
              .slice(0, 4);
            return {
                ...state,
                PreLaunchProperties:action.payload,
                isPreLaunchLoading:false,
                PreLuanchFeatProperties:featuredData,
                PreLuanchSimilarProperties:featuredSimilarData,
                PreLuanchByBuilder:TarcSimilarData,
            }

        case "API_ERROR":
            return {
                ...state,
                isLoading:false,
                isError:true,
            }

        case "SET_SINGLE_ERROR":
            return {
                ...state,
                isSingleLoading:false,
                isError:true,
            }

        case "PRELAUNCHH_API_ERROR":
            return {
                ...state,
                isPreLaunchLoading:false,
                isError:true,
                }
            
    }

   return state;
}

export default PropertyReducer;