import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate, 
} from "react-router-dom";
import Home from "./Pages/Home";
import LoginMain from "./Components/Actual_Components/LoginMain";
import AboutPage from "./Components/AboutPageComponents/AboutPage";
import Properties from "./Pages/Properties";
import MiddleMain from "./Components/PropertyViewComponents/MiddleMain";
import VerificationForm from "./Components/Forms.js/SignUpForm/VerificationForm";
import AdminMain from "./Components/AdminPanelComponents/AdminMain";
import ProfilePage from "./Components/ProfilePage";
import PropertyKnow from "./Components/KnowAbouts/PropertyKnow";
import Profile from "./Components/ProfileSec_Components/Profile";
import FinalNavBar from "./Components/HomePageComponents/NavBar";
import Footer from "./Components/Actual_Components/Footer";
import PageNotFound from "./Pages/PageNotFound";
import EditableProperty from "./Components/AdminPanelComponents/EditableProperty";
import Nav from "./aadharhomes/Nav";
import Form from "./Pages/Form";
import SignUp from "./aadharhomes/SignUp";
import SignIn from "./aadharhomes/SignIn";
import SellProperty from "./aadharhomes/SellProperty";
import BannerPage from "./aadharhomes/BannerPage/BannerPage";

//Simran Routing

import Addnew from "./AdminPage/Addnew";
import Adminproperty from "./AdminPage/Adminproperty";
import Dashboard from "./AdminPage/Dashboard";
import Blog from "./AdminPage/Blog";
// import Contact from "./AdminPage/AdminContact";
import EditProject from "./AdminPage/EditProject";
import Enquiries from "./AdminPage/Enquiries";
import Header from "./AdminPage/Header";
import Projects from "./AdminPage/Projects";
import Rent from "./AdminPage/Rent";
import Sidebar from "./AdminPage/Sidebar";
import UserProfile from "./AdminPage/UserProfile";
import Buy from "./AdminPage/Buy";
import ContactPage from "./AdminPage/ContactPage";
import PropertyRent from "./Pages/PropertyRent";

import AdminContact from "./AdminPage/AdminContact";
import Contact from "./Pages/Contact";
import ViewAllProperty from "./Pages/ViewAllProperty";
import ForgetPassword from "./Pages/ForgetPassword";
// import AboutUs from "./Pages/About";

import ResetEmailPassword from "./Pages/ResetEmailPassword";
import NewSellProperty from "./aadharhomes/NewSellProperty";
import UserAdmin from "./AdminPage/UserAdmin";
import ViewPropertyAdmin from "./AdminPage/ViewPropertyAdmin";
import ClientDetails from "./AdminPage/ViewDetails";
import EditDetails from "./AdminPage/EditDetails";
import PropViewCardPro from "./Components/Actual_Components/PropViewCardPro";
import AshishRoughPage from "./RoughComponent/AshishRoughPage";
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
import About from "./Pages/About";
import UserEditProperty from "./Pages/UserEditProperty";
import ProjectAddHighligths from "./AdminPage/ProjectAddHighligths";
import PrivateRoute from "./PrivateRoute";
import Blogging from "./Pages/Blogging";
import { DataProvider } from "./MyContext";
import ResidentialProjects from "./Components/HomePageComponents/ResidentialProjects";
function App() {
  const registeredData = {
    name: "John Doe",
    email: "johndoe@example.com",
    mobile: "1234567890",
  };
  const token = localStorage.getItem("myToken");
  const [role, setRole] = useState(null);
  

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    setRole(userRole);
  }, []);

  return (
    <DataProvider>
      <Wrapper className="section">
        <Router>
          <Routes>
            <Route
              path="/postproperty"
              element={
                token !== null ? <NewSellProperty /> : <Navigate  to="/SignIn" />
              }
            />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/" element={<Home />} />
            <Route path="/SignUP" element={<SignUp />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route  path="/termsandconditions" element={<TermsAndConditions />} />
            <Route path="/projects" element={<Properties />} />
            <Route path="/rent" element={<RentPropViewCard />} />
            <Route path="/buy" element={<BuyPropViewCard />} />
            <Route path="/rent/:id" element={<RentViewDetails />} />
            <Route path="/buy/:id" element={<BuyViewDetails />} />
            <Route path="/propviewcard" element={<PropViewCardPro />} />
            <Route path={`/property/residential`}  element={<ResidentialProjects />} />

            <Route path="/middlemain" element={<MiddleMain />} />
            <Route path="/viewallproperty" element={<ViewAllProperty />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/careerwithus" element={<CareerWithUs />} />
            <Route path="/blog" element={<Blogging />} />
            <Route path="/resetpassword/:token" element={<ForgetPassword />} />

            <Route path="/forgetpassword" element={<ResetEmailPassword />} />
            <Route  path="/form" element={<Form registeredData={registeredData} />}/>
            <Route path="/protected/private/admin" element={<AdminMain />} />
            <Route  path="/protected/private/admin/editProject/:url" element={<EditableProperty />}/>

            <Route path="/knowabouts" element={<PropertyKnow />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/:pUrl" element={<BannerPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/userviewproperty/:id" element={<UserViewProperty />} />
            <Route path="/usereditproperty" element={<UserEditProperty />} />

            <Route path="*" element={<PageNotFound />} />
            <Route path="/contactmainpage" element={<ContactPage />} />

            <Route path="/Admin/acress/dashboard" element={<Dashboard />} />
            <Route path="/Admin/viewproperty/:id" element={<ViewPropertyAdmin />}/>
            <Route path="/Admin/viewproperty/viewdetails/:id"  element={<ClientDetails />} />
            <Route path="/Admin/viewproperty/editdetails/:id"  element={<EditDetails />} />
            <Route path="/admin/addnew" element={<Addnew />} />
            <Route path="/admin/adminproperty" element={<Adminproperty />} />
            <Route path="/Admin/blog" element={<Blog />} />
            <Route path="/Admin/user" element={<UserAdmin />} />
            <Route path="/Admin/contact" element={<AdminContact />} />
            <Route path="/Admin/editProject" element={<EditProject />} />
            <Route path="/Admin/enquiries" element={<Enquiries />} />
            <Route path="/Admin/header" element={<Header />} />
            <Route path="/Admin/Projects/property" element={<Projects />} />
            <Route path="/Admin/rent" element={<Rent />} />
            <Route path="/Admin/rent/view/:id" element={<RentView />} />
            <Route path="/Admin/rent/view/edit/:id" element={<RentEdit />} />

            {/* <Route
              path="/admin/access/property/aadhar"
              element={role === "admin" ? <Sidebar/> : <Navigate to="/" />}
            /> */}

            <Route path="/admin/acress/property/aadhar" element={<Sidebar />} />

            <Route path="/Admin/buy" element={<Buy />} />
            <Route path="/Admin/buy/view/:id" element={<BuyView />} />
            <Route path="/Admin/buy/view/edit/:id" element={<BuyEdit />} />
            <Route path="/Admin/contactpage" element={<ContactPage />} />
            <Route
              path="/Admin/ContactUs/UserProfile"
              element={<UserProfile />}
            />
            <Route path="/searchdata/:key" element={<SearchData />} />
            <Route path="/Admin/ProjectsView/:pUrl" element={<ProjectView />} />
            <Route path="/Admin/ProjectsEdit/:id" element={<ProjectEdit />} />
            <Route
              path="/Admin/projecteditbhk/:id"
              element={<ProjectEditBHK />}
            />
            <Route
              path="/Admin/ProjectsAddBhk/:id"
              element={<ProjectsAddBhk />}
            />
            <Route path="/Admin/adminProperty" element={<Adminproperty />} />
            <Route
              path="Admin/ProjectAddHighlights/:id"
              element={<ProjectAddHighligths />}
            />
            <Route
              path="/dashboard"
              element={<PrivateRoute element={<Dashboard />} />}
            />
          </Routes>
        </Router>
      </Wrapper>
    </DataProvider>
  );
}

export default App;

const Wrapper = styled.section`
  font-family: "DM Sans", sans-serif;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Inter", sans-serif !important;
  }
`;
