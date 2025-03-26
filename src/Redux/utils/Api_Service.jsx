import { useDispatch } from "react-redux";
import { spotlight, trending ,featured,upcoming,affordable,luxury,scoplots,commercial,budget,projectindelhi} from "../slice/projectSlice";
import {gurugram,delhi,noida,goa,ayodhya,mumbai,panipat,panchkula,kasauli,karnal,jalandhar} from "../slice/StateProject";
import {allupcomingproject,builderindependentfloor,commercialProjectAll,deendayalplots,dlfsco,luxuryAll,luxuryvillas,newlaunch, readytomove, residential, scoplotsall, underconstruction,possessionafter2026} from "../slice/AllSectionData";
import { signatureglobal,m3m,dlf,experion,elan,bptp,adani,smartworld,trevoc,indiabulls,centralpark } from "../slice/BuilderSlice";
import {Possessionin2025,Possessionin2026} from "../slice/PossessionSlice";
import {bptpplots,orrisplots} from "../slice/ProjectOverviewSlice";

import {sohnaroad,golfcourseextensionroad,golfcourseroad,mgroad,nprroad,dwarkaexpressway,newgurgaon,sohna,sprroad,nh48} from "../slice/PrimeLocation"
import {resale} from "../slice/ResaleSlice";
import axios from "axios";
import { API_ROUTES, API_ROUTES_PROJECTS } from "./Constant_Service";
import { sortByDesiredOrder } from "../../Utils/ProjectSorting";
import { Affordable_Desired_Order, Trending_Desired_Order } from "../../Pages/datafeed/Desiredorder";
import { emaar } from "../slice/ProjectstatusSlice";
import { useCallback } from "react";
import { maxpriceproject,minpriceproject } from "../slice/PriceBasedSlice";

const Api_service = () => {
  const dispatch = useDispatch();

  const getTrending = async () => {
    try {
      const response = await axios.get(`${API_ROUTES_PROJECTS}/trending`);
      const Trendingprojects = response.data.data;
      dispatch(trending(sortByDesiredOrder((Trendingprojects),Trending_Desired_Order,"projectName")));
    } catch (error) {
      console.error("Error fetching trending data:", error);
    }
  };

  const getSpotlight = async () => {
    try {
      const response = await axios.get(`${API_ROUTES_PROJECTS}/spotlight`);
      const Spotlightprojects = response.data.data;
      dispatch(spotlight(Spotlightprojects));
    } catch (error) {
      console.error("Error fetching spotlight data:", error);
    }
  };

  const getFeatured = async() =>{
    try {
        const response = await axios.get(`${API_ROUTES_PROJECTS}/featured`);
        const Featuredprojects = response.data.data;
        dispatch(featured(Featuredprojects));

    }catch(error){
        console.error("Error fetching Featured data:", error);

    }
  }

  const getUpcoming = async() =>{
    try{
        const response = await axios.get(`${API_ROUTES_PROJECTS}/upcoming`);
        const Featuredprojects = response.data.data;
        dispatch(upcoming(Featuredprojects));
    }catch(error){
        console.error("Error fetching Upcoming data:", error);
    }
  }

  const getAffordable = async() =>{
    try{
        const response = await axios.get(`${API_ROUTES_PROJECTS}/affordable`);
        const Featuredprojects = response.data.data;
        dispatch(affordable(sortByDesiredOrder((Featuredprojects),Affordable_Desired_Order,"projectName")));
    }catch(error){
        console.error("Error fetching Affordable data:", error);
    }
  }

  const getLuxury = async() =>{
    try{
        const response = await axios.get(`${API_ROUTES_PROJECTS}/luxury`);
        const Featuredprojects = response.data.data;
        dispatch(luxury(Featuredprojects));
    }catch(error){
        console.error("Error fetching Luxury data:", error);
    }
  }

  const getScoplots = async() =>{
    try{
        const response = await axios.get(`${API_ROUTES_PROJECTS}/scoplots`);
        const Featuredprojects = response.data.data;
        dispatch(scoplots(Featuredprojects));
    }catch(error){
        console.error("Error fetching Sco data:", error);
    }
  }

  const getCommercial = async() =>{
    try{
        const response = await axios.get(`${API_ROUTES_PROJECTS}/commercial`);
        const Featuredprojects = response.data.data;
        dispatch(commercial(Featuredprojects));
    }catch(error){
        console.error("Error fetching Commercial data:", error);
    }
  }

  const getBudgetHomes = async() =>{
    try{
        const response = await axios.get(`${API_ROUTES_PROJECTS}/budgethomes`);
        const Featuredprojects = response.data.data;
        dispatch(budget(Featuredprojects));
    }catch(error){
        console.error("Error fetching BudgetHomes data:", error);
    }
  }

  const getProjectIndelhi = async()=>{
    try{
      const response = await axios.get(`${API_ROUTES_PROJECTS}/city`);
      const Delhiprojects = response.data.data;
      dispatch(projectindelhi(Delhiprojects));
  }catch(error){
      console.error("Error fetching ProjectinDelhi data:", error);
  }
  }

  const getProjectfind = async(query ,page ,limit )=>{
    try{
      const response = await axios.get(`${API_ROUTES_PROJECTS}/projectsearch?${query}=1&page=${page}&limit=${limit}`);
      const ProjectFind = response.data.data;
    }catch(error){
      console.error("Error fetching ")
    }
  }

  const getResaleProperties = async()=>{
    try {
            const res = await axios.get(`${API_ROUTES}property/buy/ViewAll`);
            const responsedata = res.data.ResaleData;
            dispatch(resale(responsedata));
          } catch (error) {
            console.error("Error fetching resale property data:", error);
          }
  }


  const getProjectbyState = async(query , limit ) => {
    try {
      const response = await axios.get(`${API_ROUTES_PROJECTS}/projectsearch?city=${query}&limit=${limit}`);
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
      }
      } catch (error) {
      console.error("Error fetching project data based on state:", error);
    }
  };
  

  const getAllProjects= async(query ,limit )=>{

    try{
      const response = await axios.get(`${API_ROUTES_PROJECTS}/projectsearch?${query}=1&limit=${limit}`);
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
        dispatch(luxuryAll(AllProjectbyQuery));
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
      }
    }catch(error){
      console.error("Error fetching ",error);
    }
  }


  const getPrimeLocation = useCallback(async(query ,limit ) => {

    try{
      const response = await axios.get(`${API_ROUTES_PROJECTS}/projectsearch?${query}=1&limit=${limit}`);
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
      const response = await axios.get(`${API_ROUTES_PROJECTS}/projectsearch?projectStatus=${query}`);
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
      const response = await axios.get(`${API_ROUTES_PROJECTS}/projectsearch?projectOverview=${query}`);
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
      const response = await axios.get(`${API_ROUTES_PROJECTS}/projectsearch?builderName=${query}&limit=${limit}`);
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
        default:
          console.warn('Unknown builder:', query);
      }
      return BuilderbyQuery;
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  }, [dispatch]);


  const getPossessionByYear = useCallback(async(query ) =>{
    try{
      const response = await axios.get(`${API_ROUTES_PROJECTS}/projectsearch?possessiondate=${query}`);
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
      const response = await axios.get(`${API_ROUTES_PROJECTS}/projectsearch?minPrice=${query}&limit=${limit}`);
      const minpriceprojectresponse = response.data.data;
      dispatch(minpriceproject(minpriceprojectresponse));

    }catch(error){
      console.error("Error fetching project data based on price:", error);

    }
  },[dispatch]);

  const getProjectBasedOnmaxPrice = useCallback(async(query ,limit ) =>{

    try{
      const response = await axios.get(`${API_ROUTES_PROJECTS}/projectsearch?maxPrice=${query}&limit=${limit}`);
      const maxpriceprojectresponse = response.data.data;
      dispatch(maxpriceproject(maxpriceprojectresponse));
    }catch(error){
      console.error("Error fetching project data based on price:", error);

    }
  },[dispatch]);

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
    getProjectBasedOnmaxPrice
  };
};

export default Api_service;
