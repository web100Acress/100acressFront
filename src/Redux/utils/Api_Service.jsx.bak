import { useDispatch } from "react-redux";
import { spotlight, trending ,featured,upcoming,affordable,luxury,scoplots,commercial,budget,projectindelhi} from "../slice/projectSlice";
import {gurugram,delhi,noida,goa,ayodhya,mumbai,panipat,panchkula,kasauli,karnal,jalandhar, sonipat, alwar, dubai, pushkar, pune} from "../slice/StateProject";  
import {allupcomingproject,builderindependentfloor,commercialProjectAll,deendayalplots,dlfsco,luxuryAll,luxuryvillas,newlaunch, readytomove, residential, scoplotsall, underconstruction,possessionafter2026,plotsingurugram,farmhouse,industrialplots,industrialprojects} from "../slice/AllSectionData";
import { signatureglobal,m3m,dlf,experion,elan,bptp,adani,smartworld,trevoc,indiabulls,centralpark,emaarindia, godrej, whiteland, aipl, birla, sobha, trump, puri, aarize, maxestates, shapoorji, satya, danube } from "../slice/BuilderSlice";
import {Possessionin2025,Possessionin2026} from "../slice/PossessionSlice";
import {bptpplots,orrisplots} from "../slice/ProjectOverviewSlice";

import {sohnaroad,golfcourseextensionroad,golfcourseroad,mgroad,nprroad,dwarkaexpressway,newgurgaon,sohna,sprroad,nh48} from "../slice/PrimeLocation"
import {resale} from "../slice/ResaleSlice";
import api from "../../config/apiClient";
import { API_ROUTES, API_ROUTES_PROJECTS } from "./Constant_Service";
import { sortByDesiredOrder } from "../../Utils/ProjectSorting";
import { getAffordableDesiredOrder, getBudgetDesiredOrder, getCommercialDesiredOrder, getLuxuryDesiredOrder, getRecommendedDesiredOrder, getSCODesiredOrder, getTrendingDesiredOrder } from "../../Utils/ProjectOrderData";
import { emaar } from "../slice/ProjectstatusSlice";
import { useCallback } from "react";
import { maxpriceproject,minpriceproject } from "../slice/PriceBasedSlice";

// Maintain per-builder abort controllers to prevent overlapping requests
const propertyOrderControllers = new Map();
// De-dup in-flight requests per builder and provide a small cache to avoid rapid repeated calls
const propertyOrderInFlight = new Map(); // key -> Promise
const propertyOrderCache = new Map();    // key -> { data, ts }
const requestThrottle = new Map();       // key -> timestamp

const Api_service = () => {
  const dispatch = useDispatch();

  const getTrending = async () => {
    try {
      // Throttle requests to prevent 429 errors
      const now = Date.now();
      const lastCall = requestThrottle.get('trending') || 0;
      if (now - lastCall < 2000) { // 2 second throttle
        console.log('Trending request throttled, skipping');
        return;
      }
      requestThrottle.set('trending', now);
      
      let trendingOrder = [];
      try {
        trendingOrder = await getTrendingDesiredOrder() || [];
        console.log('📋 Trending order:', trendingOrder);
      } catch (orderError) {
        console.warn('Could not get trending order, will use default order:', orderError);
      }
      
      await getProjectsByCategory('trending', trendingOrder, trending);
    } catch (error) {
      console.error("❌ Error in getTrending:", error);
    }
  };

  const getSpotlight = useCallback(async () => {
    try {
      console.log('🔍 getSpotlight called');
      // Throttle requests to prevent 429 errors
      const now = Date.now();
      const lastCall = requestThrottle.get('spotlight') || 0;
      if (now - lastCall < 2000) { // 2 second throttle
        console.log('Spotlight request throttled, skipping');
        return;
      }
      requestThrottle.set('spotlight', now);
      
      // Try to get recommended order, but don't fail if it doesn't exist
      let recommendedOrder = [];
      try {
        recommendedOrder = await getRecommendedDesiredOrder() || [];
        console.log('📋 Recommended order:', recommendedOrder);
      } catch (orderError) {
        console.warn('Could not get recommended order, will use default order:', orderError);
      }
      
      await getProjectsByCategory('spotlight', recommendedOrder, spotlight);
      console.log('✅ getSpotlight completed');
    } catch (error) {
      console.error("❌ Error in getSpotlight:", error);
    }
  }, [dispatch]);

  const getFeatured = async() =>{
    try {
        const response = await api.get(`${API_ROUTES.projectsBase()}/featured`);
        const Featuredprojects = response.data.data;
        dispatch(featured(Featuredprojects));

    }catch(error){
        console.error("Error fetching Featured data:", error);

    }
  }

  const getUpcoming = async() =>{
    try{
        const response = await api.get(`${API_ROUTES.projectsBase()}/upcoming`);
        const Featuredprojects = response.data.data;
        dispatch(upcoming(Featuredprojects));
    }catch(error){
        console.error("Error fetching Upcoming data:", error);
    }
  }

  const getAffordable = async() =>{
    try{
      // Throttle requests to prevent 429 errors
      const now = Date.now();
      const lastCall = requestThrottle.get('affordable') || 0;
      if (now - lastCall < 2000) { // 2 second throttle
        console.log('Affordable request throttled, skipping');
        return;
      }
      requestThrottle.set('affordable', now);
      
      // Use dynamic project ordering
      const affordableOrder = await getAffordableDesiredOrder();
      await getProjectsByCategory('affordable', affordableOrder, affordable);
    }catch(error){
        console.error("Error fetching Affordable data:", error);
    }
  }

  const getLuxury = async() =>{
    try{
        // Use dynamic project ordering
        const luxuryOrder = await getLuxuryDesiredOrder();
        await getProjectsByCategory('luxury', luxuryOrder, luxury);
    }catch(error){
        console.error("Error fetching Luxury data:", error);
    }
  }

  const getScoplots = async() =>{
    try{
        // Use dynamic project ordering
        const scoOrder = await getSCODesiredOrder();
        await getProjectsByCategory('sco', scoOrder, scoplots);
    }catch(error){
        console.error("Error fetching Sco data:", error);
    }
  }

  const getCommercial = async() =>{
    try{
        // Use dynamic project ordering
        const commercialOrder = await getCommercialDesiredOrder();
        await getProjectsByCategory('commercial', commercialOrder, commercial);
    }catch(error){
        console.error("Error fetching Commercial data:", error);
    }
  }
// weeeeeeeeeeeeeeeeeehfeiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
  const getBudgetHomes = async() => {
    try {
        // Get dynamic budget project names from ProjectOrderData
        const budgetOrder = await getBudgetDesiredOrder();
        const budgetProjectNames = budgetOrder.join(',');
        
        const response = await api.get(`${API_ROUTES.projectsBase()}/budgethomes?projects=${budgetProjectNames}`);
        const Featuredprojects = response.data.data;
        console.log('Budget Projects:', Featuredprojects.map(p => p.projectName));
        
        // Sort projects according to the desired order
        const sortedProjects = sortByDesiredOrder(
            Featuredprojects,
            budgetOrder,
            "projectName"
        );
        
        dispatch(budget(sortedProjects));
    } catch(error) {
        console.error("Error fetching BudgetHomes data:", error);
    }
  }

  // Generic function to get projects by category with dynamic ordering
  const getProjectsByCategory = async (category, projectNames = [], dispatchAction) => {
    try {
      // If no project names are provided, use the category-specific endpoint
      if (!projectNames || projectNames.length === 0) {
        console.log(`📡 No project names provided for ${category}, using direct endpoint`);
        try {
          const response = await api.get(`${API_ROUTES.projectsBase()}/${category}`);
          console.log(`✅ Successfully fetched ${category} projects directly`);
          dispatch(dispatchAction(response.data.data || []));
          return;
        } catch (directError) {
          console.error(`❌ Direct ${category} endpoint failed:`, directError);
          throw directError; // Re-throw to be caught by the outer catch
        }
      }

      // If we have project names, try the category endpoint with specific projects
      try {
        const projectNamesString = projectNames.join(',');
        const apiUrl = `${API_ROUTES.projectsBase()}/category?category=${category}&projects=${projectNamesString}`;
        console.log('🌐 API URL:', apiUrl);
        
        const response = await api.get(apiUrl);
        console.log('📡 API Response:', response.data);
        const projects = response.data.data || [];
        
        // Sort projects according to the desired order if we have projects to sort
        let sortedProjects = projects;
        if (projects.length > 0 && projectNames.length > 0) {
          sortedProjects = sortByDesiredOrder(projects, projectNames, "projectName") || projects;
          console.log('📊 Sorted projects:', sortedProjects);
        }
        
        dispatch(dispatchAction(sortedProjects));
        console.log(`✅ Dispatched ${category} projects to Redux store`);
      } catch (categoryError) {
        console.error(`❌ Category endpoint failed for ${category}, falling back to direct endpoint`);
        // Fallback to direct endpoint if category endpoint fails
        const response = await api.get(`${API_ROUTES.projectsBase()}/${category}`);
        console.log(`✅ Successfully fetched ${category} projects via fallback`);
        dispatch(dispatchAction(response.data.data || []));
      }
    } catch (error) {
      console.error(`❌ Error in getProjectsByCategory (${category}):`, error);
      console.error('❌ Error details:', error.response?.data || error.message);
      // Dispatch empty array to prevent UI errors
      dispatch(dispatchAction([]));
    }
  }
// //////////////////////////////////////////////////////////////////////////////////////////
  const getProjectIndelhi = async()=>{
    try{
      const response = await api.get(`${API_ROUTES.projectsBase()}/city`);
      const Delhiprojects = response.data.data;
      dispatch(projectindelhi(Delhiprojects));
  }catch(error){
      console.error("Error fetching ProjectinDelhi data:", error);
  }
  }

  const getProjectfind = async(query ,page ,limit )=>{
    try{
      const response = await api.get(`${API_ROUTES.projectsBase()}/projectsearch?${query}=1&page=${page}&limit=${limit}`);
      const ProjectFind = response.data.data;
    }catch(error){
      console.error("Error fetching ")
    }
  }

  const getResaleProperties = async()=>{
    try {
            const res = await api.get(`property/buy/ViewAll`);
            const responsedata = res.data.ResaleData;
            dispatch(resale(responsedata));
          } catch (error) {
            console.error("Error fetching resale property data:", error);
          }
  }


 const getProjectbyState = async (query, limit) => {
  try {
    const response = await api.get(`${API_ROUTES.projectsBase()}/projectsearch?city=${query}&limit=${limit}`);
    const ProjectbyState = response.data.data;

    if (query === 'Gurugram') {
      dispatch(gurugram(ProjectbyState));
    } else if (query === 'Delhi') {
      dispatch(delhi(ProjectbyState));
    } else if (query === 'Noida') {
      dispatch(noida(ProjectbyState));
    } else if (query === 'Goa') {
      dispatch(goa(ProjectbyState));
    } else if (query === 'Ayodhya') {
      dispatch(ayodhya(ProjectbyState));
    } else if (query === 'Mumbai') {
      dispatch(mumbai(ProjectbyState));
    } else if (query === 'Panipat') {
      dispatch(panipat(ProjectbyState));
    } else if (query === 'Panchkula') {
      dispatch(panchkula(ProjectbyState));
    } else if (query === 'Kasauli') {
      dispatch(kasauli(ProjectbyState));
    } else if (query === 'Karnal') {
      dispatch(karnal(ProjectbyState));
    } else if (query === 'Jalandhar') {
      dispatch(jalandhar(ProjectbyState));
    } else if (query === 'Sonipat') {
      dispatch(sonipat(ProjectbyState));
    } else if (query === 'Dubai') {
      dispatch(dubai(ProjectbyState)); 
    } else if (query === 'Pushkar') {
      dispatch(pushkar(ProjectbyState));
    } else if (query === 'Alwar') {
      dispatch(alwar(ProjectbyState));
    } else if (query === 'Pune') {
      dispatch(pune(ProjectbyState));
    }

  } catch (error) {
    console.error("Error fetching project data based on state:", error);
  }
};

  

  const getAllProjects= async(query ,limit )=>{

    try{
      let response;
      if (query === "farmhouse") {
        response = await api.get(`${API_ROUTES.projectsBase()}/projectsearch?type=Farm Houses&limit=${limit}`);
      } else if (query === "industrialplots") {
        response = await api.get(`${API_ROUTES.projectsBase()}/projectsearch?type=Industrial Plots&limit=${limit}`);
      } else if (query === "industrialprojects") {
        response = await api.get(`${API_ROUTES.projectsBase()}/projectsearch?type=Industrial Projects&limit=${limit}`);
      } else {
        response = await api.get(`${API_ROUTES.projectsBase()}/projectsearch?${query}=1&limit=${limit}`);
      }
      const AllProjectbyQuery = response.data.data;
      if (query === 'allupcomingproject') {
        dispatch(allupcomingproject(AllProjectbyQuery));
      }else
      if(query === "newlaunch"){
        dispatch(newlaunch(AllProjectbyQuery));
      }else
      if(query === "underconstruction"){
        dispatch(underconstruction(AllProjectbyQuery));
      }else
      if(query === "readytomove"){
        dispatch(readytomove(AllProjectbyQuery));
      }else
      if(query === "possesionafter2026"){
        dispatch(possessionafter2026(AllProjectbyQuery));
      }else
      if(query === "commercial"){
        // First try the dedicated commercial endpoint
        console.log('Trying dedicated commercial endpoint...');
        try {
          const response = await api.get(`${API_ROUTES.projectsBase()}/commercial`);
          const commercialData = response.data.data;
          if (commercialData && commercialData.length > 0) {
            console.log('Dedicated commercial endpoint successful, found', commercialData.length, 'projects');
            dispatch(commercialProjectAll(commercialData));
            return;
          }
        } catch (endpointError) {
          console.log('Dedicated commercial endpoint failed, trying general search...');
        }

        // Fallback to general search with comprehensive query
        if (!AllProjectbyQuery || AllProjectbyQuery.length === 0) {
          console.log('Commercial query returned no results, trying allcommercialprojects fallback...');
          try {
            const fallbackResponse = await api.get(`${API_ROUTES.projectsBase()}/projectsearch?allcommercialprojects=1&limit=${limit}`);
            const fallbackData = fallbackResponse.data.data;
            if (fallbackData && fallbackData.length > 0) {
              console.log('Fallback query successful, found', fallbackData.length, 'commercial projects');
              dispatch(commercialProjectAll(fallbackData));
              return;
            }
          } catch (fallbackError) {
            console.error('Fallback query also failed:', fallbackError);
          }
        }
        dispatch(commercialProjectAll(AllProjectbyQuery));
      }else
      if(query === "scoplots"){
        dispatch(scoplotsall(AllProjectbyQuery));
      }else
      if(query === "luxury"){
        const luxuryOrder = await getLuxuryDesiredOrder();
        dispatch(luxuryAll(sortByDesiredOrder((AllProjectbyQuery),luxuryOrder,"projectName")));
      }else
      if(query === "deendayalplots"){
        dispatch(deendayalplots(AllProjectbyQuery));
      }else 
      if(query === "residentiaProject"){
        dispatch(residential(AllProjectbyQuery));
      }else
      if(query === "villas"){
        dispatch(luxuryvillas(AllProjectbyQuery));
      }else
      if(query === "builderindepedentfloor"){
        dispatch(builderindependentfloor(AllProjectbyQuery));
      }else
      if(query === "dlfsco"){
        dispatch(dlfsco(AllProjectbyQuery))
      }else
      if(query === "plotsingurugram"){
        dispatch(plotsingurugram(AllProjectbyQuery))
      }else
      if(query === "farmhouse"){
        dispatch(farmhouse(AllProjectbyQuery))
      }else
      if(query === "industrialplots"){
        dispatch(industrialplots(AllProjectbyQuery))
      }else
      if(query === "industrialprojects"){
        dispatch(industrialprojects(AllProjectbyQuery))
      }
    }catch(error){
      console.error("Error fetching ",error);
    }
  }


  const getPrimeLocation = useCallback(async(query ,limit ) => {

    try{
      const response = await api.get(`${API_ROUTES.projectsBase()}/projectsearch?${query}=1&limit=${limit}`);
      const PrimeLocation = response.data.data;
      if (query === "sohnaroad") {
        dispatch(sohnaroad(PrimeLocation))
      }else
      if(query === "golfcourseroad"){
        dispatch(golfcourseroad(PrimeLocation))
      }else
      if(query === "nprroad"){
        dispatch(nprroad(PrimeLocation))
      }else
      if(query === "mgroad"){
        dispatch(mgroad(PrimeLocation))
      }else
      if(query === "dwarkaexpressway"){
        dispatch(dwarkaexpressway(PrimeLocation))
      }else
      if(query === "newgurgaon"){
        dispatch(newgurgaon(PrimeLocation))
      }else
      if(query === "sohna"){
        dispatch(sohna(PrimeLocation))
      }else
      if(query === "sprroad"){
        dispatch(sprroad(PrimeLocation));
      }else
      if(query === "nh48"){
        dispatch(nh48(PrimeLocation))
      }else
      if(query === "golfcourseextensionroad"){
        dispatch(golfcourseextensionroad(PrimeLocation))
      }
    }catch(error){
      console.error("error in fetching prime location",error)
    }
  },[dispatch]);


  const getProjectOnStatus = async(query )=>{

    try{
      const response = await api.get(`${API_ROUTES.projectsBase()}/projectsearch?projectStatus=${query}`);
      const ProjectbyStatus = response.data.data;
      if(query === "emaar"){
        dispatch(emaar(ProjectbyStatus));
      }
    }catch(error){
      console.error("Error fetching project data based on status:", error);
    }
  }


  const getProjectOnOverview = async(query )=>{

    try{
      const response = await api.get(`${API_ROUTES.projectsBase()}/projectsearch?projectOverview=${query}`);
      const ProjectByOverview =  response.data.data;
      if(query === "bptp"){
        dispatch(bptpplots(ProjectByOverview))
      }else
      if(query === "orris"){
        dispatch(orrisplots(ProjectByOverview));
      }
    }catch(error){
      console.error("Error fetching project data based on overview:", error);
    }
  }

  const getProjectbyBuilder = useCallback(async (query ,limit ) => {
    try {
      if (!query || (typeof query === 'string' && query.trim() === '')) {
        console.warn('getProjectbyBuilder: missing builder name');
        return [];
      }
      console.log('🟦 getProjectbyBuilder: start', { query, limit });
      const response = await api.get(`${API_ROUTES.projectsBase()}/projectsearch?builderName=${query}&limit=${limit}` , { timeout: 15000 });
      console.log('🟦 getProjectbyBuilder: success', { count: Array.isArray(response?.data?.data) ? response.data.data.length : 'n/a' });
      const BuilderbyQuery = response.data.data;

      switch (query) {
        case 'Signature Global':
          dispatch(signatureglobal(BuilderbyQuery));
          break;
        case 'M3M India':
          dispatch(m3m(BuilderbyQuery));
          break;
        case 'DLF Homes':
          dispatch(dlf(BuilderbyQuery));
          break;
        case 'Experion Developers':
          dispatch(experion(BuilderbyQuery));
          break;
        case 'Elan Group':
          dispatch(elan(BuilderbyQuery));
          break;
        case 'Shapoorji Pallonji': // Exact match with database
        case 'shapoorji pallonji': // Case-insensitive match for safety
          console.log('🔍 Shapoorji Pallonji data received:', BuilderbyQuery);
          if (!Array.isArray(BuilderbyQuery)) {
            console.error('🟥 Expected BuilderbyQuery to be an array, got:', typeof BuilderbyQuery);
            return [];
          }
          console.log(`🟢 Dispatching ${BuilderbyQuery.length} Shapoorji Pallonji projects to Redux`);
          dispatch(shapoorji(BuilderbyQuery));
          console.log('✅ Shapoorji Pallonji data dispatched to Redux');
          break;
        case 'Satya Group':
          console.log('🔍 Satya Group data received:', BuilderbyQuery);
          if (!Array.isArray(BuilderbyQuery)) {
            console.error('🟥 Expected BuilderbyQuery to be an array, got:', typeof BuilderbyQuery);
            return [];
          }
          console.log(`🟢 Dispatching ${BuilderbyQuery.length} Satya Group projects to Redux`);
          dispatch(satya(BuilderbyQuery));
          console.log('✅ Satya Group data dispatched to Redux');
          break;
        case 'BPTP LTD':
          dispatch(bptp(BuilderbyQuery));
          break;
        case 'Adani Realty':
          dispatch(adani(BuilderbyQuery));
          break;
        case 'Smartworld':
          dispatch(smartworld(BuilderbyQuery));
          break;
        case 'Trevoc Group':
          dispatch(trevoc(BuilderbyQuery));
          break;
        case 'Indiabulls':
          dispatch(indiabulls(BuilderbyQuery));
          break;
        case 'Central Park':
          dispatch(centralpark(BuilderbyQuery));
          break;
        case 'Emaar India':
        dispatch(emaarindia(BuilderbyQuery));
        break;
        case 'Godrej Properties':
        dispatch(godrej(BuilderbyQuery));
        break;
        case 'Whiteland Corporation':
        dispatch(whiteland(BuilderbyQuery));
        break;
        case 'AIPL':
        dispatch(aipl(BuilderbyQuery));
        break;
        case 'Birla Estate':
        case 'Birla Estates':
          dispatch(birla(BuilderbyQuery));
          break;
        case 'Sobha':
        case 'Sobha Developers':
          console.log('🔍 Dispatching sobha action with data:', BuilderbyQuery);
          dispatch(sobha(BuilderbyQuery));
          break;
        case 'Trump Towers':
        case 'trump':
          dispatch(trump(BuilderbyQuery));
          break;
        case 'Puri Constructions':
        case 'Puri':
        case 'Puri Developers': 
          console.log('🔍 Dispatching puri action with data:', BuilderbyQuery);
          dispatch(puri(BuilderbyQuery));
          break;
        case 'Aarize Group':
        case 'Aarize':
        case 'Aarize Developers':
          console.log('🔍 Dispatching aarize action with data:', BuilderbyQuery);
          dispatch(aarize(BuilderbyQuery));
          break;
        case 'Max Estates':
        case 'max estates':
          console.log('🔍 Dispatching maxestates action with data:', BuilderbyQuery);
          dispatch(maxestates(BuilderbyQuery));
          break;
        case 'Danube Properties':
          console.log('🔍 Dispatching danube action with data:', BuilderbyQuery);
          dispatch(danube(BuilderbyQuery));
          break;
        default:
          console.warn('Unknown builder:', query);
      }
      return BuilderbyQuery;
    } catch (error) {
      console.error("🟥 getProjectbyBuilder: error", error);
      return [];
    }
  }, [dispatch]);


  const getPossessionByYear = useCallback(async(query ) =>{
    try{
      const response = await api.get(`${API_ROUTES.projectsBase()}/projectsearch?possessiondate=${query}`);
      const Possessionbyyear = response?.data?.data;
      if(query === "2025"){
        dispatch(Possessionin2025(Possessionbyyear))
      }else 
      if(query === "2026"){
        dispatch(Possessionin2026(Possessionbyyear))
      }

    }catch(error){
      console.error("Error fetching possession by year ",error);
    }
  },[dispatch])


  const getProjectBasedOnminPrice = useCallback(async(query ,limit ) =>{

    try{
      const response = await api.get(`${API_ROUTES.projectsBase()}/projectsearch?minPrice=${query}&limit=${limit}`);
      const minpriceprojectresponse = response.data.data;
      dispatch(minpriceproject(minpriceprojectresponse));

    }catch(error){
      console.error("Error fetching project data based on price:", error);

    }
  },[dispatch]);

  const getProjectBasedOnmaxPrice = useCallback(async(query ,limit ) =>{

    try{
      const response = await api.get(`${API_ROUTES.projectsBase()}/projectsearch?maxPrice=${query}&limit=${limit}`);
      const maxpriceprojectresponse = response.data.data;
      dispatch(maxpriceproject(maxpriceprojectresponse));
    }catch(error){
      console.error("Error fetching project data based on price:", error);

    }
  },[dispatch]);

  const getPropertyOrder = async (builderName) => {
    const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
    try {
      if (!builderName) return null;

      const key = String(builderName).trim().toLowerCase();

      // Serve from cache if fresh
      const cached = propertyOrderCache.get(key);
      if (cached && (Date.now() - cached.ts) < CACHE_TTL_MS) {
        console.log('🟩 getPropertyOrder: cache hit for', builderName);
        return cached.data;
      }

      // If a request is already in-flight for this builder, return the same promise
      const inflight = propertyOrderInFlight.get(key);
      if (inflight) {
        console.log('🟨 getPropertyOrder: reusing in-flight promise for', builderName);
        return inflight;
      }

      // Abort any previous (stuck) controller for the same builder to avoid overlaps
      const prev = propertyOrderControllers.get(key);
      if (prev) {
        try { prev.abort(); console.log('🟨 getPropertyOrder: aborted previous request for', builderName); } catch {}
      }

      const controller = new AbortController();
      propertyOrderControllers.set(key, controller);
      console.log('🟦 getPropertyOrder: start', builderName);

      // Create a shared promise and store it as in-flight
      const promise = (async () => {
        const res = await api.get(`propertyOrder/builder/${encodeURIComponent(builderName)}`, {
          signal: controller.signal,
          timeout: 15000,
        });
        const data = res?.data?.data || null;
        console.log('🟦 getPropertyOrder: success', builderName, { hasData: !!data, count: Array.isArray(data?.customOrder) ? data.customOrder.length : 'n/a' });
        // Cache result
        propertyOrderCache.set(key, { data, ts: Date.now() });
        return data;
      })();

      propertyOrderInFlight.set(key, promise);
      const result = await promise;
      return result;
    } catch (error) {
      if (error?.name === 'CanceledError' || error?.message === 'canceled') {
        console.warn('🟨 getPropertyOrder: request canceled for', builderName);
        return null;
      }
      console.error('🟥 getPropertyOrder: error', builderName, error);
      return null;
    } finally {
      // Clear controller and in-flight entry for this builder
      const key = String(builderName || '').trim().toLowerCase();
      propertyOrderControllers.delete(key);
      propertyOrderInFlight.delete(key);
      console.log('🟦 getPropertyOrder: end', builderName);
    }
  };

  const savePropertyOrder = async ({ builderName, customOrder, hasCustomOrder = true, randomSeed = null }) => {
    try {
      if (!builderName) throw new Error('builderName required');
      const res = await api.post(`propertyOrder/save`, {
        builderName,
        customOrder: Array.isArray(customOrder) ? customOrder : [],
        hasCustomOrder: !!hasCustomOrder,
        randomSeed,
      });
      return res?.data?.data || null;
    } catch (error) {
      console.error('Error saving property order:', error);
      throw error;
    }
  };

  // Fallback fetch: get all properties then filter by builder if a dedicated endpoint doesn't exist
  const getPropertiesByBuilder = async (builderName, limit = 200) => {
    try {
      if (!builderName) return [];
      const res = await api.get(`property/buy/ViewAll`);
      const all = res?.data?.ResaleData || res?.data?.data || [];
      const filtered = all.filter((p) => {
        const b = p.builderName || p.builder || p.builder_name;
        return b && String(b).toLowerCase() === String(builderName).toLowerCase();
      });
      return filtered.slice(0, limit);
    } catch (error) {
      console.error('Error fetching properties by builder:', error);
      return [];
    }
  };

  const fetchShapoorjiProjects = async (limit = 3) => {
    // Check if we're being rate limited
    const lastRequestTime = localStorage.getItem('lastApiRequestTime');
    if (lastRequestTime && Date.now() - parseInt(lastRequestTime) < 1000) {
      console.log('⚠️ Rate limit protection: Waiting before making another request');
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    try {
      console.log('🔄 Fetching Shapoorji Pallonji projects...');
      localStorage.setItem('lastApiRequestTime', Date.now().toString());
      
      // Try to get projects from local storage first
      const cachedProjects = localStorage.getItem('shapoorjiProjects');
      if (cachedProjects) {
        try {
          const parsed = JSON.parse(cachedProjects);
          if (Array.isArray(parsed) && parsed.length > 0) {
            console.log('📦 Using cached Shapoorji Pallonji projects');
            dispatch(shapoorji(parsed));
            return parsed;
          }
        } catch (e) {
          console.log('Failed to parse cached projects', e);
        }
      }
      
      // If no cache, try to fetch from API with retry logic
      const maxRetries = 2;
      let lastError = null;
      
      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
          // Add a small delay between retries
          if (attempt > 0) {
            const delay = 1000 * Math.pow(2, attempt); // Exponential backoff
            console.log(`⏳ Retry attempt ${attempt} in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
          }
          
          const response = await api.get(
            `${API_ROUTES.projectsBase()}/projectsearch?builderName=Shapoorji Pallonji&limit=${limit}`, 
            { 
              timeout: 10000 // 10 second timeout
            }
          );
          
          if (response?.data?.data) {
            const projects = Array.isArray(response.data.data) ? response.data.data : [];
            console.log(`✅ Fetched ${projects.length} Shapoorji Pallonji projects`);
            
            // Cache the response
            try {
              localStorage.setItem('shapoorjiProjects', JSON.stringify(projects));
              localStorage.setItem('lastApiRequestTime', Date.now().toString());
            } catch (e) {
              console.warn('Failed to cache projects', e);
            }
            
            dispatch(shapoorji(projects));
            return projects;
          }
        } catch (error) {
          lastError = error;
          console.warn(`Attempt ${attempt + 1} failed:`, error.message);
          if (attempt === maxRetries) break;
        }
      }
      
      // If we get here, all retries failed
      throw lastError || new Error('Failed to fetch projects after multiple attempts');
      
    } catch (error) {
      console.error('❌ Error in fetchShapoorjiProjects:', {
        message: error.message,
        code: error.code,
        isNetworkError: !error.response,
        status: error.response?.status,
        config: {
          url: error.config?.url,
          method: error.config?.method,
        }
      });
      
      // Return cached data if available, even if stale
      try {
        const cached = localStorage.getItem('shapoorjiProjects');
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            console.log('⚠️ Using cached data due to network error');
            dispatch(shapoorji(parsed));
            return parsed;
          }
        }
      } catch (e) {
        console.warn('Could not use cached data', e);
      }
      
      return [];
    }
  };

  return {
    getTrending,
    getSpotlight,
    getFeatured,
    getUpcoming,
    getAffordable,
    getLuxury,
    getScoplots,
    getCommercial,
    getBudgetHomes,
    getProjectIndelhi,
    getProjectfind,
    getProjectbyState,
    getResaleProperties,
    getAllProjects,
    getProjectOnStatus,
    getProjectOnOverview,
    getProjectbyBuilder,
    getPrimeLocation,
    getPossessionByYear,
    getProjectBasedOnminPrice,
    getProjectBasedOnmaxPrice,
    fetchShapoorjiProjects,
    // Property order & fetch helpers
    getPropertyOrder,
    savePropertyOrder,
    getPropertiesByBuilder,
  };
};

export default Api_service;
