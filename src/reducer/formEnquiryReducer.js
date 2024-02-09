const FormEnquiryReducer =(state ,action) =>{
    switch (action.type){
        case "FRONT_PAGE_ENQUIRY_LOADING":
            return{
               ...state,
               isfrontEnquiriesLoading:true,
            }

        case "PROJECT_ENQUIRIES_LOADING":
            return{
                ...state,
                isProjectEnquriesLoading:true,
            }

        case "SET_SINGLE_FRONTPAGE_LOADING":
            return{
                ...state,
                isSingleFrontPageLoading:true,
            }

        case "SET_SINGLE_PROJECT_LOADING":
            return{
                ...state,
                isSingleProjectEnquriesLoading:true,
            }
        
        case "ALL_FRONT_ENQUIRES":
            const allEnquiries = action.payload;
            const pendingEnquiries = allEnquiries.filter(enquiry => enquiry.status === "Pending");
            const nonPendingEnquiries = allEnquiries.filter(enquiry => enquiry.status !== "Pending");

            const sortedEnquiries = [...pendingEnquiries, ...nonPendingEnquiries];
            return{
                ...state,
                FrontPageEnquiries:sortedEnquiries,
                isfrontEnquiriesLoading:false,
            }

        case "ALL_PROJECT_ENQUIRIES":
            const allProjectEnquiries = action.payload;
            const pendingProjectEnquiries = allProjectEnquiries.filter(enquiry => enquiry.status === "Pending");
            const nonPendingProjectEnquiries = allProjectEnquiries.filter(enquiry => enquiry.status !== "Pending");

            const sortedProjectEnquiries = [...pendingProjectEnquiries, ...nonPendingProjectEnquiries];
            return{
                ...state,
                ProjectEnquiries:sortedProjectEnquiries,
                isProjectEnquriesLoading:false,
            }

        case "GET_SINGLE_FRONT_ENQUIRY":
            return{
                ...state,
                SingleFrontPageEnquiry:action.payload,
                isSingleFrontPageLoading:false,
            }

        case "GET_SINGLE_PROJECT_ENQUIRY":
            return{
                ...state,
                SingleProjectEnquries:action.payload,
                isSingleProjectEnquriesLoading:false,
            }
        
        case "FRONT_ENQUIRY_ERROR":
            return{
                ...state,
                isfrontEnquiriesLoading:false,
                isError:true,
            }

        case "PROJECT_ENQUIRIES_ERROR":
            return{
                ...state,
                isProjectEnquriesLoading:false,
                isError:true,
            }

        case "SINGLE_FRONT_ENQUIRY_ERROR":
            return{
                ...state,
                isSingleFrontPageLoading:false,
                isError:true,
            }

        case "SINGLE_PROJECT_ENQUIRY_ERROR":
            return{
                ...state,
                isSingleProjectEnquriesLoading:false,
                isError:true,
            }
    }

    return state;
}

export default FormEnquiryReducer;