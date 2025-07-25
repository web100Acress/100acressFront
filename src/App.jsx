import React, { lazy, Suspense } from "react";
import "./App.css";
import { styled } from "styled-components";
import { Routes, Route, Navigate } from "react-router-dom";
import { DataProvider } from "./MyContext";
import { AuthProvider } from "./AuthContext";
import { Toaster } from "./Components/ui/Toaster";
import { Toaster as Sonner } from "./Components/ui/sonner";
import { TooltipProvider } from "./Components/ui/Tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PrivateRoute from "./Components/PrivateRoute";
import PublicRoute from "./Components/PublicRoute";
import LazyLoad from "react-lazyload";
import "animate.css";
import LoadingSpinner from "./Components/LoadingSpinner";
import ErrorBoundary from "./Components/ErrorBoundary";
import performanceMonitor from "./Utils/performanceMonitor";

// Lazy load all main page components
const Home = lazy(() => import("./Pages/Home"));
const Properties = lazy(() => import("./Pages/ProjectCities/Properties"));
const PropertyKnow = lazy(() => import("./Components/KnowAbouts/PropertyKnow"));
const PageNotFound = lazy(() => import("./Pages/PageNotFound"));
const SignUp = lazy(() => import("./aadharhomes/SignUp"));
const SignIn = lazy(() => import("./aadharhomes/SignIn"));
const PropViewCardPro = lazy(() => import("./Components/Actual_Components/PropViewCardPro"));
const NewSellProperty = lazy(() => import("./aadharhomes/NewSellProperty"));
const BuyPropViewCard = lazy(() => import("./Components/Actual_Components/BuyPropViewCard"));
const About = lazy(() => import("./Pages/About"));
const BuyViewDetails = lazy(() => import("./Pages/BuyViewDetails"));
const ResetEmailPassword = lazy(() => import("./Pages/ResetEmailPassword"));
const TermsAndConditions = lazy(() => import("./Pages/TermsAndConditions"));
const RentViewDetails = lazy(() => import("./Pages/RentViewDetails"));
const RentPropViewCard = lazy(() => import("./Components/Actual_Components/RentPropViewCard"));
const Privacy = lazy(() => import("./Pages/Privacy"));
const ContactUs = lazy(() => import("./Pages/ContactUs"));
const SearchData = lazy(() => import("./Pages/SearchData"));
const UserViewProperty = lazy(() => import("./Pages/UserViewProperty"));
const CareerWithUs = lazy(() => import("./Pages/CareerWithUs"));
const UserEditProperty = lazy(() => import("./Pages/UserEditProperty"));
const Blogging = lazy(() => import("./Pages/Blogging"));
const ResidentialProjects = lazy(() => import("./Components/HomePageComponents/ResidentialProjects"));
const UpComingProjects = lazy(() => import("./Components/HomePageComponents/UpComingProjects"));
const CommercialProject = lazy(() => import("./Components/HomePageComponents/CommercialProject"));
const ScoPlots = lazy(() => import("./Components/HomePageComponents/ScoPlots"));
const BuilderIndependentFloor = lazy(() => import("./Components/HomePageComponents/BuilderIndependentFloor"));
const DeenDayalPlots = lazy(() => import("./Components/HomePageComponents/DeenDayalPlots"));
const NewsandArtical = lazy(() => import("./Pages/NewsandArtical"));
const UserDashBoard = lazy(() => import("./Components/HomePageComponents/UserDashBoard"));
const UserEdit = lazy(() => import("./Components/HomePageComponents/UserEdit"));
const BlogView = lazy(() => import("./Pages/BlogView"));
const GurugramPrimeLocation = lazy(() => import("./Pages/GurugramPrimeLocation"));
const DelhiProject = lazy(() => import("./Pages/ProjectCities/DelhiProject"));
const NoidaProject = lazy(() => import("./Pages/ProjectCities/NoidaProject"));
const GoaProject = lazy(() => import("./Pages/ProjectCities/GoaProject"));
const PanipatProject = lazy(() => import("./Pages/ProjectCities/PanipatProject"));
const Pushkar = lazy(() => import("./Pages/ProjectCities/Pushkar"));
const QRGeneratorPage = lazy(() => import("./Pages/QRGeneratorPage"));
const BudgetPrice = lazy(() => import("./Pages/BudgetPrice"));
const ReadyToMoveProject = lazy(() => import("./Pages/ReadyToMoveProject"));
const VillasProjects = lazy(() => import("./Components/HomePageComponents/VillasProjects"));
const Panchkula = lazy(() => import("./Pages/ProjectCities/Panchkula"));
const PossessionAfter2028 = lazy(() => import("./Pages/PossessionAfter2028"));
const Bptp = lazy(() => import("./Pages/Bptp"));
const Orris = lazy(() => import("./Pages/Orris"));
const Jms = lazy(() => import("./Pages/Jms"));
const Rof = lazy(() => import("./Pages/Rof"));
const EmaarIndia = lazy(() => import("./Pages/EmaarIndia"));
const M3mIndia = lazy(() => import("./Pages/M3mIndia"));
const Microtek = lazy(() => import("./Pages/Microtek"));
const Possessionin2024 = lazy(() => import("./Pages/Possessionin2024"));
const Possessionin2025 = lazy(() => import("./Pages/Possessionin2025"));
const Mumbai = lazy(() => import("./Pages/ProjectCities/Mumbai"));
const KasauliProject = lazy(() => import("./Pages/ProjectCities/KasauliProject"));
const Sonipat = lazy(() => import("./Pages/ProjectCities/Sonipat"));
const UnderConstruction = lazy(() => import("./Pages/UnderConstruction"));
const NewLaunch = lazy(() => import("./Pages/NewLaunch"));
const Ayodhya = lazy(() => import("./Pages/ProjectCities/Ayodhya"));
const SignatureGlobal = lazy(() => import("./Pages/SignatureGlobal"));
const DlfSco = lazy(() => import("./Pages/DlfSco"));
const NewBanner = lazy(() => import("./aadharhomes/BannerPage/NewBanner"));
const Possessionin2026 = lazy(() => import("./Pages/Possessionin2026"));
const BuilderPage = lazy(() => import("./Pages/BuilderPages/BuilderPage"));
const OTPVerification = lazy(() => import("./Components/OTPVerification"));
const SignupForm = lazy(() => import("./Components/SignupForm"));
const EmailVerification = lazy(() => import("./Components/EmailVerification"));
const Karnal = lazy(() => import("./Pages/ProjectCities/Karnal"));
const Jalandhar = lazy(() => import("./Pages/ProjectCities/Jalandhar"));
const LuxuryProject = lazy(() => import("./Pages/BuilderPages/LuxuryProjects"));
const ForgetPassword = lazy(() => import("./Pages/ForgetPassword"));
const ViewAllProperty = lazy(() => import("./Pages/ViewAllProperty"));
const BlogWriteModal = lazy(() => import("./AdminPage/BlogWriteModal"));
const Dubai = lazy(() => import("./Pages/ProjectCities/Dubai"));

// Admin components (already lazy loaded)
const Addnew = lazy(() => import("./AdminPage/Addnew"));
const Adminproperty = lazy(() => import("./AdminPage/Adminproperty"));
const Dashboard = lazy(() => import("./AdminPage/Dashboard"));
const Blog = lazy(() => import("./AdminPage/Blog"));
const EditProject = lazy(() => import("./AdminPage/EditProject"));
const Enquiries = lazy(() => import("./AdminPage/Enquiries"));
const Header = lazy(() => import("./AdminPage/Header"));
const Projects = lazy(() => import("./AdminPage/Projects"));
const Rent = lazy(() => import("./AdminPage/ResaleEnquiries"));
const Sidebar = lazy(() => import("./AdminPage/Sidebar"));
const UserProfile = lazy(() => import("./AdminPage/UserProfile"));
const Buy = lazy(() => import("./AdminPage/Buy"));
const ContactPage = lazy(() => import("./AdminPage/ContactPage"));
const AdminContact = lazy(() => import("./AdminPage/AdminContact"));
const UserAdmin = lazy(() => import("./AdminPage/UserAdmin"));
const ViewPropertyAdmin = lazy(() => import("./AdminPage/ViewPropertyAdmin"));
const ClientDetails = lazy(() => import("./AdminPage/ViewDetails"));
const EditDetails = lazy(() => import("./AdminPage/EditDetails"));
const RentView = lazy(() => import("./AdminPage/RentView"));
const RentEdit = lazy(() => import("./AdminPage/RentEdit"));
const BuyView = lazy(() => import("./AdminPage/BuyView"));
const BuyEdit = lazy(() => import("./AdminPage/BuyEdit"));
const ProjectView = lazy(() => import("./AdminPage/ProjectView"));
const ProjectEdit = lazy(() => import("./AdminPage/ProjectEdit"));
const ProjectsAddBhk = lazy(() => import("./AdminPage/ProjectAddBhk"));
const ProjectEditBHK = lazy(() => import("./AdminPage/ProjectEditBHK"));
const ProjectAddHighligths = lazy(() => import("./AdminPage/ProjectAddHighligths"));
const ProjectEditHighlight = lazy(() => import("./AdminPage/ProjectEditHighlight"));
const BlogEdit = lazy(() => import("./AdminPage/BlogEdit"));
const BlogWrite = lazy(() => import("./AdminPage/BlogWrite"));
const Career = lazy(() => import("./AdminPage/Career"));
const JobPosting = lazy(() => import("./AdminPage/JobPosting"));
const CareerView = lazy(() => import("./AdminPage/CareerView"));
const CareerEdit = lazy(() => import("./AdminPage/CareerEdit"));
const JobPostingView = lazy(() => import("./AdminPage/JobPostingView"));
const JobPostingEdit = lazy(() => import("./AdminPage/JobPostingEdit"));
const InsertProject = lazy(() => import("./AdminPage/InsertProject"));
const AllListedProperties = lazy(() => import("./AdminPage/AllListedProperties"));
const BlogViewAdmin = lazy(() => import("./AdminPage/BlogViewAdmin"));
const SeoPrivateRoute = lazy(() => import("./Components/Blog_Components/SeoPrivateRoute"));
const BlogManagement = lazy(() => import("./Components/Blog_Components/BlogManagement"));
const DraftManagement = lazy(() => import("./Components/Blog_Components/DraftManagement"));
const BlogManagementSidebar = lazy(() => import("./Components/Blog_Components/BlogManagementSidebar"));
const AdminDashboard = lazy(() => import("./AdminPage/AdminDashboard"));


// const queryClient = new QueryClient();

function App() {
  const token = localStorage.getItem("myToken");

  return (
    <ErrorBoundary>
    <DataProvider>
      <AuthProvider>
        <Wrapper className="section">
            <Suspense fallback={<LoadingSpinner />}>
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
              <Route path="/projects-in-sonipat/" element={<Sonipat />} />
              <Route path="/projects-in-karnal/" element={<Karnal />} />
              <Route path="/projects-in-jalandhar/" element={<Jalandhar />} />
              <Route path="/project-in-ayodhya/" element={<Ayodhya />} />
              <Route path="/project-in-mumbai/" element={<Mumbai />} />
              <Route path="/projects-in-dubai/" element={<Dubai />} />
              <Route path="/projects-in-pushkar/" element={<Pushkar />} />
          <Route path="/qr-generator" element={<QRGeneratorPage />} />
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
              <Route index element={<LazyLoad><AdminDashboard /></LazyLoad>} />
              <Route
                path="viewproperty/:id"
                element={<LazyLoad><ViewPropertyAdmin /></LazyLoad>}
              />
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
              <Route path="all-listed-properties" element={<LazyLoad><AllListedProperties /></LazyLoad>} />
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
                element={<LazyLoad><AdminDashboard /></LazyLoad>}
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
          </Suspense>
        </Wrapper>
      </AuthProvider>
    </DataProvider>
    </ErrorBoundary>
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
