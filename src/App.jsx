// Sticky floating "List Property" button on mobile (right side)
function MobileStickyListProperty() {
  const token = typeof window !== "undefined" ? localStorage.getItem("myToken") : null;
  const postTarget = token ? "/postproperty" : "/auth/signin";
  return (
    <div className="md:hidden fixed z-[10010]" style={{ right: 0, top: '45%' }}>
      <Link
        to={postTarget}
        className="block bg-red-600 text-white font-extrabold tracking-wide shadow-lg"
        style={{
          writingMode: 'vertical-rl',
          textOrientation: 'upright',
          padding: '10px 6px',
          borderRadius: '10px 0 0 10px',
          transform: 'translateY(-50%)',
          position: 'relative',
          right: 0,
          letterSpacing: '1px'
        }}
      >
        LIST PROPERTY
      </Link>
    </div>
  );
}
import React, { lazy, Suspense, useState, useEffect } from "react";
import "./App.css";
import { styled } from "styled-components";
import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
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
import LoginForm from "./Components/LoginForm";
// import ConfettiAllCorners from "./Components/ConfettiAllCorners"; 

// Lazy load all main page components
const Home = lazy(() => import("./Pages/Home"));
const EMICalculatorPage = lazy(() => import("./Pages/EMICalculatorPage"));
// Deprecated: Properties page has been replaced by dynamic CityProjects template
// const Properties = lazy(() => import("./Pages/ProjectCities/Properties"));
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
const Activity = lazy(() => import("./Pages/Activity"));
const CareerWithUs = lazy(() => import("./Pages/CareerWithUs"));
const UserEditProperty = lazy(() => import("./Pages/UserEditProperty"));
const Blogging = lazy(() => import("./Pages/Blogging"));
const ResidentialProjects = lazy(() => import("./Components/HomePageComponents/ResidentialProjects"));
const UpComingProjects = lazy(() => import("./Components/HomePageComponents/UpComingProjects"));
const CommercialProject = lazy(() => import("./Components/HomePageComponents/CommercialProject"));
const ScoPlots = lazy(() => import("./Components/HomePageComponents/ScoPlots"));
const BuilderIndependentFloor = lazy(() => import("./Components/HomePageComponents/BuilderIndependentFloor"));
const DeenDayalPlots = lazy(() => import("./Components/HomePageComponents/DeenDayalPlots"));
const PlotsInGurugramPage = lazy(() => import("./Pages/PlotsInGurugramPage"));
const NewsandArtical = lazy(() => import("./Pages/NewsandArtical"));
const UserDashBoard = lazy(() => import("./Components/HomePageComponents/UserDashBoard"));
const UserEdit = lazy(() => import("./Components/HomePageComponents/UserEdit"));
const BlogView = lazy(() => import("./Pages/BlogView"));
const BlogInsights = lazy(() => import("./Pages/BlogInsights"));
const GurugramPrimeLocation = lazy(() => import("./Pages/GurugramPrimeLocation"));
// Per-city pages are now handled by CityProjects; imports removed
// const DelhiProject = lazy(() => import("./Pages/ProjectCities/DelhiProject"));
// const NoidaProject = lazy(() => import("./Pages/ProjectCities/NoidaProject"));
// const GoaProject = lazy(() => import("./Pages/ProjectCities/GoaProject"));
// const PanipatProject = lazy(() => import("./Pages/ProjectCities/PanipatProject"));
// const Pushkar = lazy(() => import("./Pages/ProjectCities/Pushkar"));
const QRGeneratorPage = lazy(() => import("./Pages/QRGeneratorPage"));
const BudgetPrice = lazy(() => import("./Pages/BudgetPrice"));
const ReadyToMoveProject = lazy(() => import("./Pages/ReadyToMoveProject"));
const VillasProjects = lazy(() => import("./Components/HomePageComponents/VillasProjects"));
const LuxuryVillasForSalePage = lazy(() => import("./Pages/LuxuryVillasForSalePage"));
const ScoPlotsInGurugramPage = lazy(() => import("./Pages/ScoPlotsInGurugramPage"));
// const Panchkula = lazy(() => import("./Pages/ProjectCities/Panchkula"));
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
// const Mumbai = lazy(() => import("./Pages/ProjectCities/Mumbai"));
// const KasauliProject = lazy(() => import("./Pages/ProjectCities/KasauliProject"));
// const Sonipat = lazy(() => import("./Pages/ProjectCities/Sonipat"));
const UnderConstruction = lazy(() => import("./Pages/UnderConstruction"));
const NewLaunch = lazy(() => import("./Pages/NewLaunch"));
// const Ayodhya = lazy(() => import("./Pages/ProjectCities/Ayodhya"));
const SignatureGlobal = lazy(() => import("./Pages/SignatureGlobal"));
const DlfSco = lazy(() => import("./Pages/DlfSco"));
const ProjectLayout2 = lazy(() => import("./aadharhomes/BannerPage/updatedbannerpage/components/ProjectLayout2"));
const Possessionin2026 = lazy(() => import("./Pages/Possessionin2026"));
const BuilderPage = lazy(() => import("./Pages/BuilderPages/BuilderPage"));
const OTPVerification = lazy(() => import("./Components/OTPVerification"));
const SignupForm = lazy(() => import("./Components/SignupForm"));
const EmailVerification = lazy(() => import("./Components/EmailVerification"));
// const Jalandhar = lazy(() => import("./Pages/ProjectCities/Jalandhar"));
const LuxuryProject = lazy(() => import("./Pages/BuilderPages/LuxuryProjects"));
const ForgetPassword = lazy(() => import("./Pages/ForgetPassword"));
const ViewAllProperty = lazy(() => import("./Pages/ViewAllProperty"));
const BlogWriteModal = lazy(() => import("./AdminPage/BlogWriteModal"));
// const Dubai = lazy(() => import("./Pages/ProjectCities/Dubai"));
const GlobalBudgetPrice = lazy(() => import("./Pages/GlobalBudgetPrice"));
const PriceTrends = lazy(() => import("./analytics/pages/PriceTrends"));
const CityProjects = lazy(() => import("./Pages/ProjectCities/CityProjects"));
// Analytics pages (MVP scaffold)
const MarketAnalytics = lazy(() => import("./analytics/pages/MarketAnalytics"));
const LocationIntelligence = lazy(() => import("./analytics/pages/LocationIntelligence"));
const InvestmentInsights = lazy(() => import("./analytics/pages/InvestmentInsights"));
const AnalyticsHome = lazy(() => import("./analytics/pages/AnalyticsHome"));

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
const ProjectOrderManager = lazy(() => import("./AdminPage/ProjectOrderManager"));
const BlogEdit = lazy(() => import("./AdminPage/BlogEdit"));
const BlogWrite = lazy(() => import("./AdminPage/BlogWrite"));
const Career = lazy(() => import("./AdminPage/Career"));
const JobPosting = lazy(() => import("./AdminPage/JobPosting"));
const CareerView = lazy(() => import("./AdminPage/CareerView"));
const CareerEdit = lazy(() => import("./AdminPage/CareerEdit"));
const JobPostingView = lazy(() => import("./AdminPage/JobPostingView"));
const JobApplications = lazy(() => import("./AdminPage/JobApplications"));
const JobPostingEdit = lazy(() => import("./AdminPage/JobPostingEdit"));
const InsertProject = lazy(() => import("./AdminPage/InsertProject"));
const AllListedProperties = lazy(() => import("./AdminPage/AllListedProperties"));
const BlogViewAdmin = lazy(() => import("./AdminPage/BlogViewAdmin"));
const BlogEnquiries = lazy(() => import("./AdminPage/BlogEnquiries"));
const SeoPrivateRoute = lazy(() => import("./Components/Blog_Components/SeoPrivateRoute"));
const BlogManagement = lazy(() => import("./Components/Blog_Components/BlogManagement"));
const BlogDashboard = lazy(() => import("./Components/Blog_Components/BlogDashboard"));
const DraftManagement = lazy(() => import("./Components/Blog_Components/DraftManagement"));
const BlogManagementSidebar = lazy(() => import("./Components/Blog_Components/BlogManagementSidebar"));
const AdminDashboard = lazy(() => import("./AdminPage/AdminDashboard"));
const ShortsSettings = lazy(() => import("./AdminPage/ShortsSettings"));
const InsightsNews = lazy(() => import("./Pages/InsightsNews"));
const InsightsGuides = lazy(() => import("./Pages/InsightsGuides"));

// Initialize QueryClient
const queryClient = new QueryClient();

function App() {
  const location = useLocation();
  const currentPath = location?.pathname || "/";
  // Consider dynamic project pages like '/experion-the-trillion/' etc. (single segment with trailing slash)
  const singleSegment = /^\/[A-Za-z0-9-]+\/?$/.test(currentPath);
  const blockedPrefixes = [
    'blog', 'auth', 'projects', 'project', 'property', 'loan', 'contact-us', 'userdashboard', 'admin', 'emi-calculator', 'postproperty', 'news-and-articals', 'searchdata', 'developers', 'privacy-policy', 'terms-and-conditions', 'qr-generator'
  ];
  const hasBlockedPrefix = blockedPrefixes.some((p) => currentPath.startsWith(`/${p}`));
  const isProjectPage = singleSegment && !hasBlockedPrefix && currentPath !== '/';
  const token = localStorage.getItem("myToken");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  // Set up global functions
  useEffect(() => {
    // Make showAuthModal available globally
    window.showAuthModal = () => setShowLoginModal(true);
    
    // Set up toast function if not already available
    if (!window.toast) {
      window.toast = {
        success: (message) => toast.success(message),
        error: (message) => toast.error(message),
        info: (message) => toast.info(message),
        warning: (message) => toast.warning(message),
      };
    }

    // Clean up on unmount
    return () => {
      delete window.showAuthModal;
      if (window.toast) {
        delete window.toast;
      }
    };
  }, []);

  return (
    <>
      <DataProvider>
        <AuthProvider>
          <TooltipProvider>
            <QueryClientProvider client={queryClient}>
              <ErrorBoundary>
                <Suspense fallback={<LoadingSpinner />}>
                  <Toaster position="top-right" />
                  <Sonner position="top-right" richColors />
                  

                  {/* Your existing routes */}
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
                      <Route path="/projects-in-gurugram/" element={<CityProjects />} />
                      <Route
                        path="/projects-in-gurugram/budget"
                        element={<BudgetPrice />}
                      />
                      <Route
                        path="/budget-properties/"
                        element={<GlobalBudgetPrice />}
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
                        element={<Navigate to="/projects-in-gurugram/property-ready-to-move/" replace />}
                      />
                      <Route
                        path="/projects-in-gurugram/property-possession-in-2024"
                        element={<Navigate to="/projects-in-gurugram/property-ready-to-move/" replace />}
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
                      <Route path="/sco/plots/" element={<ScoPlotsInGurugramPage />} />
                      <Route path="/dlf-homes-sco-plots/" element={<DlfSco />} />
                      <Route
                        path="/projects/independentfloors/"
                        element={<BuilderIndependentFloor />}
                      />
                      <Route path="/project-in-delhi/" element={<CityProjects />} />
                      <Route path="/project-in-noida/" element={<CityProjects />} />
                      <Route path="/project-in-panipat/" element={<CityProjects />} />
                      <Route path="/project-in-panchkula/" element={<CityProjects />} />
                      <Route path="/project-in-kasauli/" element={<CityProjects />} />
                      <Route path="/projects-in-sonipat/" element={<CityProjects />} />
                      <Route path="/projects-in-karnal/" element={<CityProjects />} />
                      <Route path="/projects-in-jalandhar/" element={<CityProjects />} />
                      <Route path="/project-in-ayodhya/" element={<CityProjects />} />
                      <Route path="/project-in-mumbai/" element={<CityProjects />} />
                      <Route path="/projects-in-dubai/" element={<CityProjects />} />
                      {/* Dynamic city projects route (generic template). Keep after specific routes to avoid conflicts. */}
                      <Route path="/projects-in-:citySlug/" element={<CityProjects />} />
                      <Route path="/project-in-:citySlug/" element={<CityProjects />} />
                      <Route path="/projects-in-pushkar/" element={<CityProjects />} />
                  <Route path="/qr-generator" element={<QRGeneratorPage />} />
                      <Route path="/emi-calculator/" element={<EMICalculatorPage />} />
                      {/* Analytics (public) */}
                      <Route path="/analytics" element={<AnalyticsHome />} />
                      <Route path="/analytics/price-trends" element={<PriceTrends />} />
                      <Route path="/analytics/market" element={<MarketAnalytics />} />
                      <Route path="/analytics/location" element={<LocationIntelligence />} />
                      <Route path="/analytics/investment" element={<InvestmentInsights />} />
                      <Route
                        path="/project-in-underconstruction/"
                        element={<UnderConstruction />}
                      />
                      <Route path="/projects-in-newlaunch/" element={<NewLaunch />} />
                      <Route path="/project-in-goa/" element={<CityProjects />} />
                      <Route path="/plots-in-gurugram/" element={<PlotsInGurugramPage />} />
                      <Route path="/projects/villas/" element={<LuxuryVillasForSalePage />} />
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
                      <Route path="/activity" element={<Activity />} />
                      <Route path="/career-with-us/" element={<CareerWithUs />} />
                      <Route path="/blog/" element={<Blogging />} />
                      {/* Place static path before dynamic ones to avoid '/blog/write' matching ':slug' */}
                      <Route path="/blog/write" element={<BlogWrite />} />
                      <Route path="/blog/:id" element={<BlogView />} />
                      <Route path="/blogging" element={<Blogging />} />
                      <Route path="/blog-insights" element={<BlogInsights />} />
                      <Route path="/insights/news/" element={<InsightsNews />} />
                      <Route path="/insights/guides/" element={<InsightsGuides />} />
                      <Route
                        path="/resetpassword/:token"
                        element={<ForgetPassword />}
                      />
                      <Route path="/forgetpassword" element={<ResetEmailPassword />} />
                      <Route path="/knowabouts" element={<PropertyKnow />} />
                      <Route path="/:pUrl/" element={<ProjectLayout2 />} />
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
                      <Route path="blog-enquiries" element={<LazyLoad><BlogEnquiries /></LazyLoad>} />
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
                        path="jobposting/applications/:id"
                        element={<LazyLoad> <JobApplications /></LazyLoad>}
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
                      <Route path="shorts" element={<LazyLoad><ShortsSettings /></LazyLoad>} />
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
                        path="project-order-manager"
                        element={<LazyLoad><ProjectOrderManager /></LazyLoad>}
                      />
                      <Route
                        path="dashboard"
                        element={<LazyLoad><AdminDashboard /></LazyLoad>}
                      />
                    </Route>

                    {/* Blog route only user with role Blog will be able to login */}
                    <Route path="/seo/" element={<SeoPrivateRoute />}>
                      <Route path="blogs" element={<BlogManagementSidebar />} >
                        <Route index element={<BlogDashboard />} />
                        <Route path="dashboard" element={<BlogDashboard />} />
                        <Route path="manage" element={<BlogManagement />} />
                        <Route path="write" element={<BlogWriteModal />} />
                        <Route path="view/:id" element={<BlogView />} />
                        <Route path="edit/:id" element={<BlogWriteModal />} />
                        <Route path="drafts" element={<DraftManagement />} />
                      </Route>
                    </Route>
                  </Routes>
                </Suspense>
              </ErrorBoundary>
            </QueryClientProvider>
          </TooltipProvider>
        </AuthProvider>
      </DataProvider>
      {/* Global mobile bottom navigation (hidden on project pages) */}
      {!isProjectPage && <MobileBottomNav />}
      {/* Global mobile sticky List Property button (hidden on project pages) */}
      {!isProjectPage && <MobileStickyListProperty />}
    </>
  );
}

export default App;

// Mobile bottom navigation (visible only on small screens)
function MobileBottomNav() {
  const location = useLocation();
  const path = location.pathname || "/";
  const token = typeof window !== "undefined" ? localStorage.getItem("myToken") : null;

  const [hideForNewBanner, setHideForNewBanner] = React.useState(() => {
    if (typeof document === 'undefined') return false;
    return document.body.classList.contains('newbanner-page');
  });

  React.useEffect(() => {
    if (typeof document === 'undefined' || !document.body) return;
    const update = () => setHideForNewBanner(document.body.classList.contains('newbanner-page'));
    update();
    const observer = new MutationObserver(() => update());
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  if (hideForNewBanner) return null;

  const isActive = (match) => {
    if (Array.isArray(match)) return match.some((m) => path.startsWith(m));
    return path === match || path.startsWith(match);
  };

  const postTarget = token ? "/postproperty" : "/auth/signin";
  const likedTarget = token ? "/userdashboard/?tab=liked" : "/auth/signin";
  const profileTarget = token ? "/userdashboard/" : "/auth/signin";

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-[10000]">
      <div className="mx-auto max-w-screen-md">
        <div className="relative px-2 pb-[10px] pt-2">
          {/* Bar background */}
          <div className="absolute inset-0 rounded-t-3xl bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.08)]"></div>

          <div className="relative grid grid-cols-5 items-end text-xs text-gray-600">
            {/* Home */}
            <Link to="/" className="flex flex-col items-center gap-1 py-2">
              <span className={`text-xl ${isActive(["/", "/projects", "/property"]) ? "text-red-600" : "text-gray-500"}`}>
                <i className="fa-solid fa-house"></i>
              </span>
              <span className={`${isActive(["/", "/projects", "/property"]) ? "text-gray-900 font-semibold" : ""}`}>Home</span>
            </Link>

            {/* Blogs (Insights -> Blogs) */}
            <Link to="/blog/" className="flex flex-col items-center gap-1 py-2">
              <span className={`text-xl ${isActive("/blog") ? "text-red-600" : "text-gray-500"}`}>
                <i className="fa-solid fa-blog"></i>
              </span>
              <span className={`${isActive("/blog") ? "text-gray-900 font-semibold" : ""}`}>Blogs</span>
            </Link>

            {/* Center CTA: Contact (call by phone) */}
            <div className="flex flex-col items-center justify-center -mt-6">
              <a
                href="tel:+918500900100"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-lg ring-4 ring-white"
              >
                <i className="fa-solid fa-phone text-lg"></i>
              </a>
              <span className="mt-1 text-[11px]">Contact</span>
            </div>

            {/* Liked (was Shortlisted) */}
            <Link to={likedTarget} className="flex flex-col items-center gap-1 py-2">
              <span className={`text-xl ${isActive("/userdashboard") && (new URLSearchParams(location.search).get("tab") === "liked") ? "text-red-600" : "text-gray-500"}`}>
                <i className="fa-solid fa-heart"></i>
              </span>
              <span className={`${isActive("/userdashboard") && (new URLSearchParams(location.search).get("tab") === "liked") ? "text-gray-900 font-semibold" : ""}`}>Liked</span>
            </Link>

            {/* Profile */}
            <Link to={profileTarget} className="flex flex-col items-center gap-1 py-2">
              <span className={`text-xl ${isActive("/userdashboard") ? "text-red-600" : "text-gray-500"}`}>
                <i className="fa-solid fa-user"></i>
              </span>
              <span className={`${isActive("/userdashboard") ? "text-gray-900 font-semibold" : ""}`}>Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

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
