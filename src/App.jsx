import React,{lazy} from "react";
import "./App.css";
import { styled } from "styled-components";
import {Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Properties from "./Pages/ProjectCities/Properties";
import PropertyKnow from "./Components/KnowAbouts/PropertyKnow";
import PageNotFound from "./Pages/PageNotFound";
import SignUp from "./aadharhomes/SignUp";
import SignIn from "./aadharhomes/SignIn";
import Addnew from  "./AdminPage/Addnew";
import Adminproperty from  "./AdminPage/Adminproperty";
import Dashboard from  "./AdminPage/Dashboard";
import Blog from  "./AdminPage/Blog";
import EditProject from  "./AdminPage/EditProject";
import Enquiries from  "./AdminPage/Enquiries";
import Header from  "./AdminPage/Header";
import Projects from  "./AdminPage/Projects";
import Rent from  "./AdminPage/ResaleEnquiries";
import Sidebar from  "./AdminPage/Sidebar";
import UserProfile from  "./AdminPage/UserProfile";
import Buy from  "./AdminPage/Buy";
import ContactPage from  "./AdminPage/ContactPage";
import About from  "./Pages/About";
import AdminContact from  "./AdminPage/AdminContact";
import ViewAllProperty from "./Pages/ViewAllProperty";
import ForgetPassword from "./Pages/ForgetPassword";
import ResetEmailPassword from "./Pages/ResetEmailPassword";
import NewSellProperty from "./aadharhomes/NewSellProperty";
import UserAdmin from  "./AdminPage/UserAdmin";
import ViewPropertyAdmin from  "./AdminPage/ViewPropertyAdmin";
import ClientDetails from  "./AdminPage/ViewDetails";
import EditDetails from  "./AdminPage/EditDetails";
import PropViewCardPro from "./Components/Actual_Components/PropViewCardPro";
import RentPropViewCard from "./Components/Actual_Components/RentPropViewCard";
import BuyPropViewCard from "./Components/Actual_Components/BuyPropViewCard";
import RentViewDetails from "./Pages/RentViewDetails";
import BuyViewDetails from "./Pages/BuyViewDetails";
import Privacy from "./Pages/Privacy";
import TermsAndConditions from "./Pages/TermsAndConditions";
import RentView from "./AdminPage/RentView";  
import RentEdit from "./AdminPage/RentEdit";  
import BuyView from "./AdminPage/BuyView";  
import BuyEdit from "./AdminPage/BuyEdit";  
import ProjectView from "./AdminPage/ProjectView";  
import ProjectEdit from "./AdminPage/ProjectEdit";  
import ProjectsAddBhk from "./AdminPage/ProjectAddBhk";  
import ProjectEditBHK from "./AdminPage/ProjectEditBHK";  
import ContactUs from "./Pages/ContactUs";
import SearchData from "./Pages/SearchData";
import UserViewProperty from "./Pages/UserViewProperty";
import CareerWithUs from "./Pages/CareerWithUs";
import UserEditProperty from "./Pages/UserEditProperty";
import ProjectAddHighligths from "./AdminPage/ProjectAddHighligths";
import Blogging from "./Pages/Blogging";
import { DataProvider } from "./MyContext";
import ResidentialProjects from "./Components/HomePageComponents/ResidentialProjects";
import UpComingProjects from "./Components/HomePageComponents/UpComingProjects";
import CommercialProject from "./Components/HomePageComponents/CommercialProject";
import ProjectEditHighlight from "./AdminPage/ProjectEditHighlight";
import ScoPlots from "./Components/HomePageComponents/ScoPlots";
import BuilderIndependentFloor from "./Components/HomePageComponents/BuilderIndependentFloor";
import DeenDayalPlots from "./Components/HomePageComponents/DeenDayalPlots";
import NewsandArtical from "./Pages/NewsandArtical";
import { AuthProvider } from "./AuthContext";
import UserDashBoard from "./Components/HomePageComponents/UserDashBoard";
import UserEdit from "./Components/HomePageComponents/UserEdit";
import BlogView from "./Pages/BlogView";
import BlogEdit from  "./AdminPage/BlogEdit";
import BlogWrite from  "./AdminPage/BlogWrite";
import GurugramPrimeLocation from "./Pages/GurugramPrimeLocation";
import Career from  "./AdminPage/Career";
import JobPosting from  "./AdminPage/JobPosting";
import CareerView from  "./AdminPage/CareerView";
import CareerEdit from  "./AdminPage/CareerEdit";
import JobPostingView from  "./AdminPage/JobPostingView";
import JobPostingEdit from  "./AdminPage/JobPostingEdit";
import DelhiProject from "./Pages/ProjectCities/DelhiProject";
import InsertProject from "./AdminPage/InsertProject";
import UserDetails from "./AdminPage/UserDetails";
import NoidaProject from "./Pages/ProjectCities/NoidaProject";
import GoaProject from "./Pages/ProjectCities/GoaProject";
import PanipatProject from "./Pages/ProjectCities/PanipatProject";
import PrivateRoute from "./Components/PrivateRoute";
import PublicRoute from "./Components/PublicRoute";
import BudgetPrice from "./Pages/BudgetPrice";
import BlogViewAdmin from "./AdminPage/BlogViewAdmin";
import ReadyToMoveProject from "./Pages/ReadyToMoveProject";
import VillasProjects from "./Components/HomePageComponents/VillasProjects";
import Panchkula from "./Pages/ProjectCities/Panchkula";
import PossessionAfter2028 from "./Pages/PossessionAfter2028";
import Bptp from "./Pages/Bptp";
import Orris from "./Pages/Orris";
import Jms from "./Pages/Jms";
import Rof from "./Pages/Rof";
import EmaarIndia from "./Pages/EmaarIndia";
import M3mIndia from "./Pages/M3mIndia";
import Microtek from "./Pages/Microtek";
import Possessionin2024 from "./Pages/Possessionin2024";
import Possessionin2025 from "./Pages/Possessionin2025";
import Mumbai from "./Pages/ProjectCities/Mumbai";
import KasauliProject from "./Pages/ProjectCities/KasauliProject";
import Nh48 from "./Pages/Nh48";
import MgRoad from "./Pages/MgRoad";
import UnderConstruction from "./Pages/UnderConstruction";
import NewLaunch from "./Pages/NewLaunch";
import Ayodhya from "./Pages/ProjectCities/Ayodhya";
import SignatureGlobal from "./Pages/SignatureGlobal";
import DlfSco from "./Pages/DlfSco";
import NewBanner from "./aadharhomes/BannerPage/NewBanner";
import "animate.css";
import Possessionin2026 from "./Pages/Possessionin2026";
import BuilderPage from "./Pages/BuilderPages/BuilderPage";
import OTPVerification from "./Components/OTPVerification";
import SignupForm from "./Components/SignupForm";
import EmailVerification from "./Components/EmailVerification";
import Karnal from "./Pages/ProjectCities/Karnal";
import Jalandhar from "./Pages/ProjectCities/Jalandhar";
import LuxuryProject from "./Pages/BuilderPages/LuxuryProjects";
import LazyLoad from "react-lazyload";

function App() {
  const token = localStorage.getItem("myToken");

  return (
    <DataProvider>
      <AuthProvider>
        <Wrapper className="section">
          {/* <Router> */}
          <Routes>
            <Route element={<PublicRoute />}>
              <Route index element={<Home />} />
              <Route
                path="/postproperty"
                element={
                  token !== null ? (
                    <NewSellProperty />
                  ) : (
                    <Navigate to="/auth/signin" />
                  )
                }
              />
              <Route path="/auth/" element={<SignUp />}>
                <Route path="signup/">
                  <Route index element={<SignupForm />} />
                  <Route
                    path="email-verification/"
                    element={<EmailVerification />}
                  />
                  <Route
                    path="otp-verification/"
                    element={<OTPVerification />}
                  />
                </Route>
                <Route path="signin/" element={<SignIn />} />
              </Route>
              <Route path="/privacy-policy/" element={<Privacy />} />
              <Route
                path="/terms-and-conditions/"
                element={<TermsAndConditions />}
              />
              <Route path="/projects-in-gurugram/" element={<Properties />} />
              <Route
                path="/projects-in-gurugram/budget"
                element={<BudgetPrice />}
              />
              <Route
                path="/projects-in-gurugram/property-ready-to-move/"
                element={<ReadyToMoveProject />}
              />
              <Route
                path="/projects-in-gurugram/property-possession-after-2026/"
                element={<PossessionAfter2028 />}
              />
              <Route
                path="/projects-in-gurugram/property-possession-in-2024/"
                element={<Possessionin2024 />}
              />
              <Route
                path="/developers/:builderName"
                element={<BuilderPage />}
              />
              <Route
                path="/projects-in-gurugram/property-possession-in-2025/"
                element={<Possessionin2025 />}
              />
              <Route
                path="/projects-in-gurugram/property-possession-in-2026/"
                element={<Possessionin2026 />}
              />
              <Route
                path="/rental-properties/best-rental-property-in-gurugram/"
                element={<RentPropViewCard />}
              />
              <Route
                path="/buy-properties/best-resale-property-in-gurugram/"
                element={<BuyPropViewCard />}
              />
              <Route path="/about-us/" element={<About />} />
              <Route
                path="/rental-properties/:pUrl/:id/"
                element={<RentViewDetails />}
              />
              <Route
                path="/buy-properties/:pUrl/:id/"
                element={<BuyViewDetails />}
              />
              <Route path="/propviewcard" element={<PropViewCardPro />} />
              <Route
                path="/property/residential/"
                element={<ResidentialProjects />}
              />
              <Route
                path="/projects/upcoming-projects-in-gurgaon/"
                element={<UpComingProjects />}
              />
              <Route
                path="/projects/commerial/"
                element={<CommercialProject />}
              />
              <Route path="/sco/plots/" element={<ScoPlots />} />
              <Route path="/dlf-homes-sco-plots/" element={<DlfSco />} />
              <Route
                path="/projects/independentfloors/"
                element={<BuilderIndependentFloor />}
              />
              <Route path="/project-in-delhi/" element={<DelhiProject />} />
              <Route path="/project-in-noida/" element={<NoidaProject />} />
              <Route path="/project-in-panipat/" element={<PanipatProject />} />
              <Route path="/project-in-panchkula/" element={<Panchkula />} />
              <Route path="/project-in-kasauli/" element={<KasauliProject />} />
              <Route path="/projects-in-karnal/" element={<Karnal />} />
              <Route path="/projects-in-jalandhar/" element={<Jalandhar />} />
              <Route path="/project-in-ayodhya/" element={<Ayodhya />} />
              <Route path="/project-in-mumbai/" element={<Mumbai />} />
              <Route
                path="/project-in-underconstruction/"
                element={<UnderConstruction />}
              />
              <Route path="/projects-in-newlaunch/" element={<NewLaunch />} />
              <Route path="/project-in-goa/" element={<GoaProject />} />
              <Route path="/plots-in-gurugram/" element={<DeenDayalPlots />} />
              <Route path="/projects/villas/" element={<VillasProjects />} />
              <Route path="/news-and-articals/" element={<NewsandArtical />} />
              <Route
                path="/userdashboard/"
                element={
                  token !== null ? <UserDashBoard /> : <Navigate to="/" />
                }
              />
              <Route path="/useredit/:id" element={<UserEdit />} />
              <Route path="/viewallproperty" element={<ViewAllProperty />} />
              <Route path="/contact-us/" element={<ContactUs />} />
              <Route path="/career-with-us/" element={<CareerWithUs />} />
              <Route path="/blog/" element={<Blogging />} />
              <Route path="/blog/:blogTitle/:id" element={<BlogView />} />
              <Route path="/blog/write" element={<BlogWrite />} />
              <Route
                path="/resetpassword/:token"
                element={<ForgetPassword />}
              />
              <Route path="/forgetpassword" element={<ResetEmailPassword />} />
              <Route path="/knowabouts" element={<PropertyKnow />} />
              <Route path="/:pUrl/" element={<NewBanner />} />
              <Route
                path="/userviewproperty/:id"
                element={<UserViewProperty />}
              />
              <Route path="/usereditproperty" element={<UserEditProperty />} />
              <Route
                path="/property-in-gurugram/:location"
                element={<GurugramPrimeLocation />}
              />
              <Route path="/property-in-gurugram/nh-48" element={<Nh48 />} />

              <Route
                path="/property-in-gurugram/mg-road"
                element={<MgRoad />}
              />

              <Route path="*" element={<PageNotFound />} />
              <Route path="/contactmainpage" element={<ContactPage />} />
              <Route path="/searchdata/:key" element={<SearchData />} />
              <Route path="/bptp-plots-gurugram/" element={<Bptp />} />
              <Route path="/orris-plots-gurugram/" element={<Orris />} />
              <Route path="/jms-plots-gurugram/" element={<Jms />} />
              <Route path="/top-luxury-projects/" element={<LuxuryProject />} />
              <Route path="/rof-plots-gurugram/" element={<Rof />} />
              <Route
                path="/signatureglobal-plots-gurugram/"
                element={<SignatureGlobal />}
              />
              <Route
                path="/emaar-india-sco-plots-gurugram/"
                element={<EmaarIndia />}
              />
              <Route
                path="/m3m-india-sco-plots-gurugram/"
                element={<M3mIndia />}
              />
              <Route
                path="/microtek-infra-sco-plots-gurugram/"
                element={<Microtek />}
              />
            </Route>

            {/* Admin Routing */}
              <Route  element={<PrivateRoute />}>
                       
                <Route
                  path="/Admin/acress/dashboard"
                  element={<PrivateRoute />}
                />
              
                <Route
                  path="/Admin/viewproperty/:id"
                  element={<LazyLoad><ViewPropertyAdmin /></LazyLoad>}
                />
                {/* hi there */}
                <Route
                  path="/Admin/viewproperty/viewdetails/:id"
                  element={<LazyLoad><ClientDetails /></LazyLoad>}
                />
                <Route
                  path="/Admin/viewproperty/editdetails/:id"
                  element={<LazyLoad><EditDetails /></LazyLoad>}
                />
                <Route path="/Admin/dashboard" element={<LazyLoad><Dashboard /></LazyLoad>} />
                <Route path="/Admin/addnew" element={<LazyLoad><Addnew /></LazyLoad>} />
                <Route path="/Admin/project-insert" element={<LazyLoad><InsertProject /></LazyLoad>} />
                <Route path="/Admin/adminproperty" element={<LazyLoad><Adminproperty /></LazyLoad>} />
                <Route path="/Admin/blog/view/:id" element={<LazyLoad><BlogViewAdmin /></LazyLoad>} />
                <Route path="/Admin/blog/edit/:id" element={<LazyLoad><BlogEdit /></LazyLoad>} />
                <Route path="/Admin/career" element={<LazyLoad><Career /></LazyLoad>} />
                <Route path="/Admin/user" element={<LazyLoad><UserAdmin /></LazyLoad>} />
                <Route path="/Admin/userdetails" element={<LazyLoad><UserDetails /></LazyLoad>} />
                <Route path="/Admin/contact" element={<LazyLoad><AdminContact /></LazyLoad>} />
                <Route path="/Admin/editProject" element={<LazyLoad><EditProject /></LazyLoad>} />
                <Route path="/Admin/enquiries" element={<LazyLoad><Enquiries /></LazyLoad>} />
                <Route path="/Admin/header" element={<LazyLoad><Header /></LazyLoad>} />
                <Route path="/Admin/Projects/property" element={<LazyLoad><Projects /></LazyLoad>} />
                <Route path="/Admin/resale-enquiries" element={<LazyLoad><Rent /></LazyLoad>} />
                <Route path="/Admin/jobposting" element={<LazyLoad><JobPosting /></LazyLoad>} />
                <Route path="/Admin/blog" element={<LazyLoad><Blog /></LazyLoad>} />
                <Route
                  path="/Admin/jobposting/view/:id"
                  element={<LazyLoad> <JobPostingView /></LazyLoad>}
                />
                <Route
                  path="/Admin/jobposting/edit/:id"
                  element={<LazyLoad> <JobPostingEdit /></LazyLoad>}
                />
                <Route path="/Admin/rent/view/:id" element={<LazyLoad> <RentView /></LazyLoad>} />
                <Route path="/Admin/rent/view/edit/:id" element={<LazyLoad> <RentEdit /></LazyLoad>} />
                <Route
                  path="/admin/acress/property/aadhar"
                  element={<LazyLoad> <Sidebar /></LazyLoad>}
                />
                <Route path="/Admin/buy" element={<LazyLoad> <Buy /></LazyLoad>} />
                <Route path="/Admin/buy/view/:id" element={<LazyLoad> <BuyView /></LazyLoad>} />
                <Route path="/Admin/buy/view/edit/:id" element={<LazyLoad> <BuyEdit /></LazyLoad>} />
                <Route path="/Admin/contactpage" element={<LazyLoad> <ContactPage /></LazyLoad>} />
                <Route
                  path="/Admin/ContactUs/UserProfile"
                  element={<LazyLoad> <UserProfile /></LazyLoad>}
                />
                <Route
                  path="/Admin/ProjectsView/:pUrl"
                  element={<LazyLoad> <ProjectView /></LazyLoad>}
                />
                <Route path="/Admin/ProjectsEdit/:id" element={<LazyLoad> <ProjectEdit /></LazyLoad>} />
                <Route path="/Admin/careerview/:id" element={<LazyLoad> <CareerView /></LazyLoad>} />
                <Route path="/Admin/careerEdit/:id" element={<LazyLoad> <CareerEdit /></LazyLoad>} />
                <Route
                  path="/Admin/projecteditbhk/:id"
                  element={<LazyLoad> <ProjectEditBHK /></LazyLoad>}
                />
                <Route
                  path="/Admin/projectedithighlight/:id"
                  element={<LazyLoad> <ProjectEditHighlight /></LazyLoad>}
                />
                <Route
                  path="/Admin/ProjectsAddBhk/:id"
                  element={<LazyLoad> <ProjectsAddBhk /></LazyLoad>}
                />
                <Route path="/Admin/adminProperty" element={<LazyLoad> <Adminproperty /></LazyLoad>} />
                <Route
                  path="/Admin/ProjectAddHighlights/:id"
                  element={<LazyLoad> <ProjectAddHighligths /></LazyLoad>}
                />
                <Route
                  path="/dashboard"
                  element={<PrivateRoute element={<LazyLoad><Dashboard /></LazyLoad>} />}
                />
              </Route>
          </Routes>
          {/* </Router> */}
        </Wrapper>
      </AuthProvider>
    </DataProvider>
  );
}

export default App;

const Wrapper = styled.section`
  .rubik-default {
    font-family: "Rubik", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400; /* Regular weight, you can change this if needed */
    font-style: normal;
  }
  h1,
  h2,
  h3,
  span,
  div,
  li,
  a {
    font-family: "Rubik", sans-serif;
  }
`;
