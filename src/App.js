import React from "react";
import "./App.css";
import { styled } from "styled-components";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Properties from "./Pages/Properties";
import MiddleMain from "./Components/PropertyViewComponents/MiddleMain";
import AdminMain from "./Components/AdminPanelComponents/AdminMain";
import PropertyKnow from "./Components/KnowAbouts/PropertyKnow";
import Profile from "./Components/ProfileSec_Components/Profile";
import PageNotFound from "./Pages/PageNotFound";
import EditableProperty from "./Components/AdminPanelComponents/EditableProperty";
import Form from "./Pages/Form";
import SignUp from "./aadharhomes/SignUp";
import SignIn from "./aadharhomes/SignIn";

import BannerPage from "./aadharhomes/BannerPage/BannerPage";

//Simran Routing

import Addnew from "./AdminPage/Addnew";
import Adminproperty from "./AdminPage/Adminproperty";
import Dashboard from "./AdminPage/Dashboard";
import Blog from "./AdminPage/Blog";
import EditProject from "./AdminPage/EditProject";
import Enquiries from "./AdminPage/Enquiries";
import Header from "./AdminPage/Header";
import Projects from "./AdminPage/Projects";
import Rent from "./AdminPage/ResaleEnquiries";
import Sidebar from "./AdminPage/Sidebar";
import UserProfile from "./AdminPage/UserProfile";
import Buy from "./AdminPage/Buy";
import ContactPage from "./AdminPage/ContactPage";
import About from "./Pages/About";
import AdminContact from "./AdminPage/AdminContact";
import ViewAllProperty from "./Pages/ViewAllProperty";
import ForgetPassword from "./Pages/ForgetPassword";

import ResetEmailPassword from "./Pages/ResetEmailPassword";
import NewSellProperty from "./aadharhomes/NewSellProperty";
import UserAdmin from "./AdminPage/UserAdmin";
import ViewPropertyAdmin from "./AdminPage/ViewPropertyAdmin";
import ClientDetails from "./AdminPage/ViewDetails";
import EditDetails from "./AdminPage/EditDetails";
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
import BlogEdit from "./AdminPage/BlogEdit";
import BlogWrite from "./AdminPage/BlogWrite";
import GurugramPrimeLocation from "./Pages/GurugramPrimeLocation";
import Career from "./AdminPage/Career";
import JobPosting from "./AdminPage/JobPosting";
import CareerView from "./AdminPage/CareerView";
import CareerEdit from "./AdminPage/CareerEdit";
import JobPostingView from "./AdminPage/JobPostingView";
import JobPostingEdit from "./AdminPage/JobPostingEdit";
import DelhiProject from "./Pages/DelhiProject";
import InsertProject from "./AdminPage/InsertProject";
import UserDetails from "./AdminPage/UserDetails";
import NoidaProject from "./Pages/NoidaProject";
import GoaProject from "./Pages/GoaProject";
import PanipatProject from "./Pages/PanipatProject";
import PrivateRoute from "./Components/PrivateRoute";
import PublicRoute from "./Components/PublicRoute";
import BudgetPrice from "./Pages/BudgetPrice";
import BlogViewAdmin from "./AdminPage/BlogViewAdmin";
import ReadyToMoveProject from "./Pages/ReadyToMoveProject";
import DlfProject from "./Pages/DlfProject";
import VillasProjects from "./Components/HomePageComponents/VillasProjects";
import Panchkula from "./Pages/Panchkula";
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
import Mumbai from "./Pages/Mumbai";
function App() {
  const registeredData = {
    name: "John Doe",
    email: "johndoe@example.com",
    mobile: "1234567890",
  };
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
                    <Navigate to="/signin" />
                  )
                }
              />
              <Route path="/signup/" element={<SignUp />} />
              <Route path="/signin/" element={<SignIn />} />
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
                path="/projects-in-gurugram/property-possession-after-2025/"
                element={<PossessionAfter2028 />}
              />
              <Route
                path="/projects-in-gurugram/property-possession-in-2024/"
                element={<Possessionin2024 />}
              />
              <Route
                path="/projects-in-gurugram/property-possession-in-2025/"
                element={<Possessionin2025 />}
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
                path="/projects/upcoming-projects-in-gurgaon"
                element={<UpComingProjects />}
              />
              <Route
                path="/projects/commerial/"
                element={<CommercialProject />}
              />
              <Route path="/sco/plots/" element={<ScoPlots />} />
              <Route
                path="/projects/independentfloors/"
                element={<BuilderIndependentFloor />}
              />
              <Route path="/project-in-delhi/" element={<DelhiProject />} />
              <Route path="/project-in-noida/" element={<NoidaProject />} />
              <Route path="/project-in-panipat/" element={<PanipatProject />} />
              <Route path="/project-in-panchkula/" element={<Panchkula />} />
              <Route path="/project-in-mumbai/" element={<Mumbai />} />
              <Route path="/dlf-homes-projects/" element={<DlfProject />} />
              <Route path="/project-in-goa/" element={<GoaProject />} />
              <Route path="/deendayal/plots/" element={<DeenDayalPlots />} />
              <Route path="/projects/villas" element={<VillasProjects />} />
              <Route path="/news-and-articals/" element={<NewsandArtical />} />
              <Route
                path="/userdashboard/"
                element={
                  token !== null ? <UserDashBoard /> : <Navigate to="/" />
                }
              />
              <Route path="/useredit/:id" element={<UserEdit />} />
              <Route path="/middlemain" element={<MiddleMain />} />
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
              <Route
                path="/form"
                element={<Form registeredData={registeredData} />}
              />
              <Route path="/protected/private/admin" element={<AdminMain />} />
              <Route
                path="/protected/private/admin/editProject/:url"
                element={<EditableProperty />}
              />
              <Route path="/knowabouts" element={<PropertyKnow />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/:pUrl" element={<BannerPage />} />
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
              <Route path="/rof-plots-gurugram/" element={<Rof />} />
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
              <Route path="/Admin/blog" element={<Blog />} />
            </Route>

            {/* Admin Routing */}
            <Route element={<PrivateRoute />}>
              <Route
                path="/Admin/acress/dashboard"
                element={<PrivateRoute />}
              />
              <Route
                path="/Admin/viewproperty/:id"
                element={<ViewPropertyAdmin />}
              />
              <Route
                path="/Admin/viewproperty/viewdetails/:id"
                element={<ClientDetails />}
              />
              <Route
                path="/Admin/viewproperty/editdetails/:id"
                element={<EditDetails />}
              />
              <Route path="/Admin/addnew" element={<Addnew />} />
              <Route path="/Admin/project-insert" element={<InsertProject />} />
              <Route path="/Admin/adminproperty" element={<Adminproperty />} />
              <Route path="/Admin/blog/view/:id" element={<BlogViewAdmin />} />
              <Route path="/Admin/blog/edit/:id" element={<BlogEdit />} />
              <Route path="/Admin/career" element={<Career />} />
              <Route path="/Admin/user" element={<UserAdmin />} />
              <Route path="/Admin/userdetails" element={<UserDetails />} />
              <Route path="/Admin/contact" element={<AdminContact />} />
              <Route path="/Admin/editProject" element={<EditProject />} />
              <Route path="/Admin/enquiries" element={<Enquiries />} />
              <Route path="/Admin/header" element={<Header />} />
              <Route path="/Admin/Projects/property" element={<Projects />} />
              <Route path="/Admin/resale-enquiries" element={<Rent />} />
              <Route path="/Admin/jobposting" element={<JobPosting />} />
              <Route
                path="/Admin/jobposting/view/:id"
                element={<JobPostingView />}
              />
              <Route
                path="/Admin/jobposting/edit/:id"
                element={<JobPostingEdit />}
              />
              <Route path="/Admin/rent/view/:id" element={<RentView />} />
              <Route path="/Admin/rent/view/edit/:id" element={<RentEdit />} />
              <Route
                path="/admin/acress/property/aadhar"
                element={<Sidebar />}
              />
              <Route path="/Admin/buy" element={<Buy />} />
              <Route path="/Admin/buy/view/:id" element={<BuyView />} />
              <Route path="/Admin/buy/view/edit/:id" element={<BuyEdit />} />
              <Route path="/Admin/contactpage" element={<ContactPage />} />
              <Route
                path="/Admin/ContactUs/UserProfile"
                element={<UserProfile />}
              />
              <Route
                path="/Admin/ProjectsView/:pUrl"
                element={<ProjectView />}
              />
              <Route path="/Admin/ProjectsEdit/:id" element={<ProjectEdit />} />
              <Route path="/Admin/careerview/:id" element={<CareerView />} />
              <Route path="/Admin/careerEdit/:id" element={<CareerEdit />} />
              <Route
                path="/Admin/projecteditbhk/:id"
                element={<ProjectEditBHK />}
              />
              <Route
                path="/Admin/projectedithighlight/:id"
                element={<ProjectEditHighlight />}
              />
              <Route
                path="/Admin/ProjectsAddBhk/:id"
                element={<ProjectsAddBhk />}
              />
              <Route path="/Admin/adminProperty" element={<Adminproperty />} />
              <Route
                path="/Admin/ProjectAddHighlights/:id"
                element={<ProjectAddHighligths />}
              />
              <Route
                path="/dashboard"
                element={<PrivateRoute element={<Dashboard />} />}
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
