import ForgetPassword from "./Pages/ForgetPassword";
import ViewAllProperty from "./Pages/ViewAllProperty";
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
import PropViewCardPro from "./Components/Actual_Components/PropViewCardPro";
import NewSellProperty from "./aadharhomes/NewSellProperty";
import BuyPropViewCard from "./Components/Actual_Components/BuyPropViewCard";
import About from  "./Pages/About";
import BuyViewDetails from "./Pages/BuyViewDetails";
import ResetEmailPassword from "./Pages/ResetEmailPassword";
import TermsAndConditions from "./Pages/TermsAndConditions";
import RentViewDetails from "./Pages/RentViewDetails";
import RentPropViewCard from "./Components/Actual_Components/RentPropViewCard";
import Privacy from "./Pages/Privacy";
import ContactUs from "./Pages/ContactUs";
import SearchData from "./Pages/SearchData";
import UserViewProperty from "./Pages/UserViewProperty";
import CareerWithUs from "./Pages/CareerWithUs";
import UserEditProperty from "./Pages/UserEditProperty";
import Blogging from "./Pages/Blogging";
import { DataProvider } from "./MyContext";
import ResidentialProjects from "./Components/HomePageComponents/ResidentialProjects";
import UpComingProjects from "./Components/HomePageComponents/UpComingProjects";
import CommercialProject from "./Components/HomePageComponents/CommercialProject";
import ScoPlots from "./Components/HomePageComponents/ScoPlots";
import BuilderIndependentFloor from "./Components/HomePageComponents/BuilderIndependentFloor";
import DeenDayalPlots from "./Components/HomePageComponents/DeenDayalPlots";
import NewsandArtical from "./Pages/NewsandArtical";
import { AuthProvider } from "./AuthContext";
import UserDashBoard from "./Components/HomePageComponents/UserDashBoard";
import UserEdit from "./Components/HomePageComponents/UserEdit";
import BlogView from "./Pages/BlogView";
import GurugramPrimeLocation from "./Pages/GurugramPrimeLocation";
import DelhiProject from "./Pages/ProjectCities/DelhiProject";
import NoidaProject from "./Pages/ProjectCities/NoidaProject";
import GoaProject from "./Pages/ProjectCities/GoaProject";
import PanipatProject from "./Pages/ProjectCities/PanipatProject";
import PrivateRoute from "./Components/PrivateRoute";
import PublicRoute from "./Components/PublicRoute";
import BudgetPrice from "./Pages/BudgetPrice";
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
import { BlogWriteModal } from "./AdminPage/BlogWriteModal";
const Addnew = lazy(()=>import(  "./AdminPage/Addnew"));
const Adminproperty = lazy(()=>import(  "./AdminPage/Adminproperty"));
const Dashboard = lazy(()=>import(  "./AdminPage/Dashboard"));
const Blog = lazy(()=>import(  "./AdminPage/Blog"));
const EditProject = lazy(()=>import(  "./AdminPage/EditProject"));
const Enquiries = lazy(()=>import(  "./AdminPage/Enquiries"));
const Header = lazy(()=>import(  "./AdminPage/Header"));
const Projects = lazy(()=>import(  "./AdminPage/Projects"));
const Rent = lazy(()=>import(  "./AdminPage/ResaleEnquiries"));
const Sidebar = lazy(()=>import(  "./AdminPage/Sidebar"));
const UserProfile = lazy(()=>import(  "./AdminPage/UserProfile"));
const Buy = lazy(()=>import(  "./AdminPage/Buy"));
const ContactPage = lazy(()=>import(  "./AdminPage/ContactPage"));
const AdminContact = lazy(()=> import("./AdminPage/AdminContact"));
const UserAdmin = lazy(() => import(  "./AdminPage/UserAdmin"));
const ViewPropertyAdmin = lazy(() => import(  "./AdminPage/ViewPropertyAdmin"));
const ClientDetails = lazy(() => import(  "./AdminPage/ViewDetails"));
const EditDetails = lazy(() => import(  "./AdminPage/EditDetails"));
const RentView = lazy(()=> import("./AdminPage/RentView"));  
const RentEdit = lazy(()=> import("./AdminPage/RentEdit"));  
const BuyView = lazy(()=> import("./AdminPage/BuyView"));  
const BuyEdit = lazy(()=> import("./AdminPage/BuyEdit"));  
const ProjectView =lazy(()=> import("./AdminPage/ProjectView"));  
const ProjectEdit =lazy(()=> import("./AdminPage/ProjectEdit"));  
const ProjectsAddBhk =lazy(()=> import("./AdminPage/ProjectAddBhk"));  
const ProjectEditBHK =lazy(()=> import("./AdminPage/ProjectEditBHK"));  
const ProjectAddHighligths = lazy(()=>import("./AdminPage/ProjectAddHighligths")); ;
const ProjectEditHighlight = lazy(() => import("./AdminPage/ProjectEditHighlight"));
const BlogEdit = lazy(()=> import("./AdminPage/BlogEdit"));
const BlogWrite = lazy(()=> import("./AdminPage/BlogWrite"));
const Career = lazy(()=> import("./AdminPage/Career"));
const JobPosting = lazy(()=> import("./AdminPage/JobPosting"));
const CareerView = lazy(()=> import("./AdminPage/CareerView"));
const CareerEdit = lazy(()=> import("./AdminPage/CareerEdit"));
const JobPostingView = lazy(()=> import("./AdminPage/JobPostingView"));
const JobPostingEdit = lazy(()=> import("./AdminPage/JobPostingEdit"));
const InsertProject = lazy(()=>import("./AdminPage/InsertProject"));
const UserDetails = lazy(()=>import("./AdminPage/UserDetails"));
const BlogViewAdmin = lazy(()=>import("./AdminPage/BlogViewAdmin"));
const SeoPrivateRoute =  lazy(() => import("./Components/Blog_Components/SeoPrivateRoute")) ;
const BlogManagement = lazy(()=> import("./Components/Blog_Components/BlogManagement"));
const DraftManagement = lazy(()=> import("./Components/Blog_Components/DraftManagement"));
const BlogManagementSidebar = lazy(()=>import("./Components/Blog_Components/BlogManagementSidebar"));


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
                path="/projects/commercial/"
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
              <Route path="/admin" element={<PrivateRoute />}>
                <Route index element={<LazyLoad><Dashboard /></LazyLoad>} />              
                <Route
                  path="viewproperty/:id"
                  element={<LazyLoad><ViewPropertyAdmin /></LazyLoad>}
                />
                {/* hi there */}
                <Route
                  path="viewproperty/viewdetails/:id"
                  element={<LazyLoad><ClientDetails /></LazyLoad>}
                />
                <Route
                  path="viewproperty/editdetails/:id"
                  element={<LazyLoad><EditDetails /></LazyLoad>}
                />
                <Route path="addnew" element={<LazyLoad><Addnew /></LazyLoad>} />
                <Route path="project-insert" element={<LazyLoad><InsertProject /></LazyLoad>} />
                <Route path="adminproperty" element={<LazyLoad><Adminproperty /></LazyLoad>} />
                <Route path="blog/view/:id" element={<LazyLoad><BlogViewAdmin /></LazyLoad>} />
                <Route path="blog/edit/:id" element={<LazyLoad><BlogEdit /></LazyLoad>} />
                <Route path="career" element={<LazyLoad><Career /></LazyLoad>} />
                <Route path="user" element={<LazyLoad><UserAdmin /></LazyLoad>} />
                <Route path="userdetails" element={<LazyLoad><UserDetails /></LazyLoad>} />
                <Route path="contact" element={<LazyLoad><AdminContact /></LazyLoad>} />
                <Route path="editProject" element={<LazyLoad><EditProject /></LazyLoad>} />
                <Route path="enquiries" element={<LazyLoad><Enquiries /></LazyLoad>} />
                <Route path="header" element={<LazyLoad><Header /></LazyLoad>} />
                <Route path="Projects/property" element={<LazyLoad><Projects /></LazyLoad>} />
                <Route path="resale-enquiries" element={<LazyLoad><Rent /></LazyLoad>} />
                <Route path="jobposting" element={<LazyLoad><JobPosting /></LazyLoad>} />
                <Route path="blog" element={<LazyLoad><Blog /></LazyLoad>} />
                <Route
                  path="jobposting/view/:id"
                  element={<LazyLoad> <JobPostingView /></LazyLoad>}
                />
                <Route
                  path="jobposting/edit/:id"
                  element={<LazyLoad> <JobPostingEdit /></LazyLoad>}
                />
                <Route path="rent/view/:id" element={<LazyLoad> <RentView /></LazyLoad>} />
                <Route path="rent/view/edit/:id" element={<LazyLoad> <RentEdit /></LazyLoad>} />
                <Route
                  path="acress/property/aadhar"
                  element={<LazyLoad> <Sidebar /></LazyLoad>}
                />
                <Route path="buy" element={<LazyLoad> <Buy /></LazyLoad>} />
                <Route path="buy/view/:id" element={<LazyLoad> <BuyView /></LazyLoad>} />
                <Route path="buy/view/edit/:id" element={<LazyLoad> <BuyEdit /></LazyLoad>} />
                <Route path="contactpage" element={<LazyLoad> <ContactPage /></LazyLoad>} />
                <Route
                  path="ContactUs/UserProfile"
                  element={<LazyLoad> <UserProfile /></LazyLoad>}
                />
                <Route
                  path="ProjectsView/:pUrl"
                  element={<LazyLoad> <ProjectView /></LazyLoad>}
                />
                <Route path="ProjectsEdit/:id" element={<LazyLoad> <ProjectEdit /></LazyLoad>} />
                <Route path="careerview/:id" element={<LazyLoad> <CareerView /></LazyLoad>} />
                <Route path="careerEdit/:id" element={<LazyLoad> <CareerEdit /></LazyLoad>} />
                <Route
                  path="projecteditbhk/:id"
                  element={<LazyLoad> <ProjectEditBHK /></LazyLoad>}
                />
                <Route
                  path="projectedithighlight/:id"
                  element={<LazyLoad> <ProjectEditHighlight /></LazyLoad>}
                />
                <Route
                  path="ProjectsAddBhk/:id"
                  element={<LazyLoad> <ProjectsAddBhk /></LazyLoad>}
                />
                <Route path="adminProperty" element={<LazyLoad> <Adminproperty /></LazyLoad>} />
                <Route
                  path="ProjectAddHighlights/:id"
                  element={<LazyLoad> <ProjectAddHighligths /></LazyLoad>}
                />
                <Route
                  path="dashboard"
                  element={<LazyLoad><Dashboard /></LazyLoad>}
                />
              </Route>

              {/* Blog route only user with role Blog will be able to login */}
              <Route path="/seo/" element={<SeoPrivateRoute />}>
                <Route path="blogs" element={<BlogManagementSidebar />} >
                  <Route index element={<BlogManagement />} />
                  <Route path="write" element={<BlogWriteModal />} />
                  <Route path="view/:id" element={<BlogView />} />
                  <Route path="edit/:id" element={<BlogWriteModal />} />
                  <Route path="drafts" element={<DraftManagement />} />
                </Route>               
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
