import { useDispatch } from "react-redux";
import { spotlight, trending ,featured,upcoming,affordable,luxury,scoplots,commercial,budget,projectindelhi} from "../slice/projectSlice";
import {gurugram,delhi,noida,goa,ayodhya,mumbai,panipat,panchkula,kasauli,karnal,jalandhar, sonipat, dubai, pushkar} from "../slice/StateProject";  
import {allupcomingproject,builderindependentfloor,commercialProjectAll,deendayalplots,dlfsco,luxuryAll,luxuryvillas,newlaunch, readytomove, residential, scoplotsall, underconstruction,possessionafter2026,plotsingurugram} from "../slice/AllSectionData";
import { signatureglobal,m3m,dlf,experion,elan,bptp,adani,smartworld,trevoc,indiabulls,centralpark,emaarindia, godrej, whiteland, aipl, birla, sobha, trump, puri, aarize} from "../slice/BuilderSlice";
import {Possessionin2025,Possessionin2026} from "../slice/PossessionSlice";
import {bptpplots,orrisplots} from "../slice/ProjectOverviewSlice";

import {sohnaroad,golfcourseextensionroad,golfcourseroad,mgroad,nprroad,dwarkaexpressway,newgurgaon,sohna,sprroad,nh48} from "../slice/PrimeLocation"
import {resale} from "../slice/ResaleSlice";
import api from "../../config/apiClient";
import { API_ROUTES, API_ROUTES_PROJECTS } from "./Constant_Service";
import { sortByDesiredOrder } from "../../Utils/ProjectSorting";
import { Affordable_Desired_Order, BUDGET_DESIRED_ORDER, COMMERCIAL_DESIRED_ORDER, DesiredLuxuryOrder, Recommendedreordered, SCO_DESIRED_ORDER, Trending_Desired_Order } from "../../Utils/ProjectOrderData";
import { emaar } from "../slice/ProjectstatusSlice";
import { useCallback } from "react";
import { maxpriceproject,minpriceproject } from "../slice/PriceBasedSlice";

// Maintain per-builder abort controllers to prevent overlapping requests
const propertyOrderControllers = new Map();
// De-dup in-flight requests per builder and provide a small cache to avoid rapid repeated calls
const propertyOrderInFlight = new Map(); // key -> Promise
const propertyOrderCache = new Map();    // key -> { data, ts }

const Api_service = () => {
  const dispatch = useDispatch();

  const getTrending = async () => {
    try {
      // Use dynamic project ordering
      await getProjectsByCategory('trending', Trending_Desired_Order, trending);
    } catch (error) {
      console.error("Error fetching trending data:", error);
    }
  };

  const getSpotlight = useCallback(async () => {
    try {
      // Use dynamic project ordering
      await getProjectsByCategory('spotlight', Recommendedreordered, spotlight);
    } catch (error) {
      console.error("Error fetching spotlight data:", error);
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
        // Use dynamic project ordering
        await getProjectsByCategory('affordable', Affordable_Desired_Order, affordable);
    }catch(error){
        console.error("Error fetching Affordable data:", error);
    }
  }

  const getLuxury = async() =>{
    try{
        // Use dynamic project ordering
        await getProjectsByCategory('luxury', Luxury_Desired_Order, luxury);
    }catch(error){
        console.error("Error fetching Luxury data:", error);
    }
  }

  const getScoplots = async() =>{
    try{
        // Use dynamic project ordering
        await getProjectsByCategory('sco', SCO_DESIRED_ORDER, scoplots);
    }catch(error){
        console.error("Error fetching Sco data:", error);
    }
  }

  const getCommercial = async() =>{
    try{
        // Use dynamic project ordering
        await getProjectsByCategory('commercial', COMMERCIAL_DESIRED_ORDER, commercial);
    }catch(error){
        console.error("Error fetching Commercial data:", error);
    }
  }
// weeeeeeeeeeeeeeeeeehfeiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
  const getBudgetHomes = async() => {
    try {
        // Get dynamic budget project names from ProjectOrderData
        const budgetProjectNames = BUDGET_DESIRED_ORDER.join(',');
        
        const response = await api.get(`${API_ROUTES.projectsBase()}/budgethomes?projects=${budgetProjectNames}`);
        const Featuredprojects = response.data.data;
        console.log('Budget Projects:', Featuredprojects.map(p => p.projectName));
        
        // Sort projects according to the desired order
        const sortedProjects = sortByDesiredOrder(
            Featuredprojects,
            BUDGET_DESIRED_ORDER,
            "projectName"
        );
        
        dispatch(budget(sortedProjects));
    } catch(error) {
        console.error("Error fetching BudgetHomes data:", error);
    }
  }

  // Generic function to get projects by category with dynamic ordering
  const getProjectsByCategory = async(category, projectNames, dispatchAction) => {
    try {
        const projectNamesString = projectNames.join(',');
        const response = await api.get(`${API_ROUTES.projectsBase()}/category?category=${category}&projects=${projectNamesString}`);
        const projects = response.data.data;
        
        // Sort projects according to the desired order
        const sortedProjects = sortByDesiredOrder(
            projects,
            projectNames,
            "projectName"
        );
        
        dispatch(dispatchAction(sortedProjects));
    } catch(error) {
        console.error(`Error fetching ${category} data:`, error);
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
    } if (query === 'Pushkar') {
  dispatch(pushkar(ProjectbyState));
}

  } catch (error) {
    console.error("Error fetching project data based on state:", error);
  }
};

  

  const getAllProjects= async(query ,limit )=>{

    try{
      const response = await api.get(`${API_ROUTES.projectsBase()}/projectsearch?${query}=1&limit=${limit}`);
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
        dispatch(commercialProjectAll(AllProjectbyQuery));
      }else
      if(query === "scoplots"){
        dispatch(scoplotsall(AllProjectbyQuery));
      }else
      if(query === "luxury"){
        dispatch(luxuryAll(sortByDesiredOrder((AllProjectbyQuery),DesiredLuxuryOrder,"projectName")));
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
    // Property order & fetch helpers
    getPropertyOrder,
    savePropertyOrder,
    getPropertiesByBuilder,
  };
};

export default Api_service;
