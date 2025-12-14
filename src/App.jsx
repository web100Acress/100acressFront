import React, { lazy, Suspense, useState, useEffect } from "react";
import "./App.css";
import { styled } from "styled-components";
import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import { DataProvider } from "./MyContext";
import { AuthProvider } from "./AuthContext";
import { Toaster } from "./Components/ui/Toaster";
import { Toaster as Sonner } from "./Components/ui/sonner";
import { Toaster as HotToaster } from "react-hot-toast";
import { TooltipProvider } from "./Components/ui/Tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PrivateRoute from "./Components/PrivateRoute";
import HrPrivateRoute from "./Components/HrPrivateRoute";
import SalesHeadPrivateRoute from "./Components/SalesHeadPrivateRoute";
import PublicRoute from "./Components/PublicRoute";
import LazyLoad from "react-lazyload";
import "animate.css";
import LoadingSpinner from "./Components/LoadingSpinner";
import ErrorBoundary from "./Components/ErrorBoundary";
import LoginForm from "./Resister/LoginForm";
import AuthModal from "./Resister/AuthModal";

// import ConfettiAllCorners from "./Components/ConfettiAllCorners"; 

// Lazy load all main page components
const Home = lazy(() => import("./Pages/Home"));
const EMICalculatorPage = lazy(() => import("./Pages/EMICalculatorPage"));
// Deprecated: Properties page has been replaced by dynamic CityProjects template
// const Properties = lazy(() => import("./Pages/ProjectCities/Properties"));
const PropertyKnow = lazy(() => import("./Components/KnowAbouts/PropertyKnow"));
const PageNotFound = lazy(() => import("./Pages/PageNotFound"));
// const SignUp = lazy(() => import("./aadharhomes/SignUp"));
// const SignIn = lazy(() => import("./aadharhomes/SignIn"));
const PropViewCardPro = lazy(() => import("./Components/Actual_Components/PropViewCardPro"));
const NewSellProperty = lazy(() => import("./aadharhomes/NewSellProperty"));
const BuyPropViewCard = lazy(() => import("./Components/Actual_Components/BuyPropViewCard"));
const About = lazy(() => import("./Pages/About"));
const AboutModern = lazy(() => import("./Pages/AboutModern"));
const BuyViewDetails = lazy(() => import("./Pages/BuyViewDetails"));
const ResetEmailPassword = lazy(() => import("./Pages/ResetEmailPassword"));
const TermsAndConditions = lazy(() => import("./Pages/privacy/TermsAndConditions"));
const RentViewDetails = lazy(() => import("./Pages/RentViewDetails"));
const RentPropViewCard = lazy(() => import("./Components/Actual_Components/RentPropViewCard"));
const Privacy = lazy(() => import("./Pages/privacy/Privacy"));
const Disclaimer = lazy(() => import("./Pages/privacy/Disclaimer"));
const ContactUs = lazy(() => import("./Pages/ContactUs"));
const SearchData = lazy(() => import("./Pages/SearchData"));
const UserViewProperty = lazy(() => import("./Pages/UserViewProperty"));
const Activity = lazy(() => import("./Pages/Activity"));
const CareerWithUs = lazy(() => import("./Pages/CareerWithUs"));
const UserEditProperty = lazy(() => import("./Pages/UserEditProperty"));
const Blogging = lazy(() => import("./Pages/Blogging"));
import ModernBlogPage from "./Components/Blog_Components/ModernBlogPage";
const ProjectStatusSearch = lazy(() => import("./Pages/ProjectStatusSearch"));
// Global Template Components
const ProjectStatusSearchGlobal = lazy(() => import("./Pages/ProjectStatusSearch/ProjectStatusSearchGlobal"));
const CityProjectsGlobal = lazy(() => import("./Pages/ProjectCities/CityProjectsGlobal"));
const ProjectTypeGlobal = lazy(() => import("./Pages/ProjectType/ProjectTypeGlobal"));
const DeenDayalPlots = lazy(() => import("./Components/HomePageComponents/DeenDayalPlots"));
const NewsandArtical = lazy(() => import("./Pages/NewsandArtical"));
const UserDashBoard = lazy(() => import("./Components/HomePageComponents/UserDashBoard"));
const UserEdit = lazy(() => import("./Components/HomePageComponents/UserEdit"));
import ModernBlogView from "./Components/Blog_Components/ModernBlogView";
const BlogInsights = lazy(() => import("./Insight/pages/BlogInsights"));
// Per-city pages are now handled by CityProjects; imports removed
// const DelhiProject = lazy(() => import("./Pages/ProjectCities/DelhiProject"));
// const NoidaProject = lazy(() => import("./Pages/ProjectCities/NoidaProject"));
// const GoaProject = lazy(() => import("./Pages/ProjectCities/GoaProject"));
// const PanipatProject = lazy(() => import("./Pages/ProjectCities/PanipatProject"));
// const Pushkar = lazy(() => import("./Pages/ProjectCities/Pushkar"));
const QRGeneratorPage = lazy(() => import("./Pages/QRGeneratorPage"));
const BudgetPrice = lazy(() => import("./Pages/BudgetPrice"));
const PossessionAfter2028 = lazy(() => import("./Pages/PossessionAfter2028"));
// New dynamic project type route
const ProjectTypePage = lazy(() => import("./Pages/ProjectType/[type]"));
const ProjectTypeDemo = lazy(() => import("./Components/ProjectTypeDemo"));
const Bptp = lazy(() => import("./Pages/Bptp"));
const Orris = lazy(() => import("./Pages/Orris"));
const HrSidebar = lazy(() => import("./Hr/HrSidebar"));
const HrDashboard = lazy(() => import("./Hr/HrDashboard"));
const Hr = lazy(() => import("./Hr/Hr"));
const HrJobPosting = lazy(() => import("./Hr/JobPosting"));
const Possessionin2024 = lazy(() => import("./Pages/Possessionin2024"));
const Possessionin2025 = lazy(() => import("./Pages/Possessionin2025"));
// const Mumbai = lazy(() => import("./Pages/ProjectCities/Mumbai"));
// const KasauliProject = lazy(() => import("./Pages/ProjectCities/KasauliProject"));
// const Sonipat = lazy(() => import("./Pages/ProjectCities/Sonipat"));
const NewLaunch = lazy(() => import("./Pages/NewLaunch"));
// const Ayodhya = lazy(() => import("./Pages/ProjectCities/Ayodhya"));
// const DlfSco = lazy(() => import("./Pages/DlfSco"));
const ProjectLayout2 = lazy(() => import("./aadharhomes/BannerPage/updatedbannerpage/components/ProjectLayout2"));
const Possessionin2026 = lazy(() => import("./Pages/Possessionin2026"));
const BuilderPage = lazy(() => import("./Pages/BuilderPages/BuilderPage"));
const OTPVerification = lazy(() => import("./Components/OTPVerification"));
const SignupForm = lazy(() => import("./Resister/SignupForm"));
const EmailVerification = lazy(() => import("./Components/EmailVerification"));
// const Jalandhar = lazy(() => import("./Pages/ProjectCities/Jalandhar"));
const LuxuryProject = lazy(() => import("./Pages/BuilderPages/LuxuryProjects"));
const ForgetPassword = lazy(() => import("./Pages/ForgetPassword"));
const ViewAllProperty = lazy(() => import("./Pages/ViewAllProperty"));
const BlogWriteModal = lazy(() => import("./AdminPage/BlogWriteModal"));
// const Dubai = lazy(() => import("./Pages/ProjectCities/Dubai"));
const GlobalBudgetPrice = lazy(() => import("./Pages/GlobalBudgetPrice"));
const PriceTrends = lazy(() => import("./Insight/pages/PriceTrends"));
const CityProjects = lazy(() => import("./Pages/ProjectCities/CityProjects"));
// Analytics pages (MVP scaffold)
const MarketReports = lazy(() => import("./Insight/pages/MarketReports"));
const AreaAnalytics = lazy(() => import("./Insight/pages/AreaAnalytics"));
const AnalyticsHome = lazy(() => import("./Insight/pages/AnalyticsHome"));
const MarketAnalytics = lazy(() => import("./Insight/pages/MarketAnalytics"));
const LocationIntelligence = lazy(() => import("./Insight/pages/LocationIntelligence"));
const InvestmentInsights = lazy(() => import("./Insight/pages/InvestmentInsights"));
const LoanEligibility = lazy(() => import("./Insight/pages/LoanEligibility"));

// Contact Card components
const ContactCard = lazy(() => import("./Components/ContactCard/ContactCard"));
const ModernContactCard = lazy(() => import("./Components/ContactCard/ModernContactCard"));
const UnifiedContactCard = lazy(() => import("./Components/ContactCard/UnifiedContactCard"));
const ContactCardLayout = lazy(() => import("./Components/Layout/ContactCardLayout"));

// Admin components (already lazy loaded)
const Addnew = lazy(() => import("./AdminPage/Addnew"));
const InsertProject = lazy(() => import("./AdminPage/InsertProject"));
const AdminDashboard = lazy(() => import("./AdminPage/AdminDashboard"));
const ProjectFilterOrderManagement = lazy(() => import("./AdminPage/ProjectFilterOrderManagement"));
const ContactCardManagement = lazy(() => import("./AdminPage/ContactCardManagement"));
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
const ProjectOrderManagement = lazy(() => import("./AdminPage/ProjectOrderManagement"));
const BlogEdit = lazy(() => import("./AdminPage/BlogEdit"));
const BlogWrite = lazy(() => import("./AdminPage/BlogWrite"));
const Career = lazy(() => import("./Hr/Career"));
const JobPosting = lazy(() => import("./Hr/JobPosting"));
const CareerView = lazy(() => import("./Hr/CareerView"));
const CareerEdit = lazy(() => import("./Hr/CareerEdit"));
const JobPostingView = lazy(() => import("./Hr/JobPostingView"));
const JobApplications = lazy(() => import("./Hr/JobApplications"));
const JobPostingEdit = lazy(() => import("./Hr/JobPostingEdit"));
const SalesHeadAllListedProperties = lazy(() => import("./SalesHeadPage/Components/SalesHeadAllListedProperties"));
const SalesHeadResaleEnquiries = lazy(() => import("./SalesHeadPage/Components/SalesHeadResaleEnquiries"));
const SalesHeadRegisteredUsers = lazy(() => import("./SalesHeadPage/Components/SalesHeadRegisteredUsers"));
const AllListedProperties = lazy(() => import("./AdminPage/AllListedProperties"));
const Adminproperty = lazy(() => import("./AdminPage/Adminproperty"));
const BlogViewAdmin = lazy(() => import("./AdminPage/BlogViewAdmin"));
// const BlogEnquiries = lazy(() => import("./AdminPage/BlogEnquiries"));
const OtherEnquiries = lazy(() => import("./AdminPage/OtherEnquiries"));
const SeoPrivateRoute = lazy(() => import("./Components/Blog_Components/SeoPrivateRoute"));
const BlogManagement = lazy(() => import("./Components/Blog_Components/BlogManagement"));
const BlogDashboard = lazy(() => import("./Components/Blog_Components/BlogDashboard"));
const DraftManagement = lazy(() => import("./Components/Blog_Components/DraftManagement"));
const BlogManagementSidebar = lazy(() => import("./Components/Blog_Components/BlogManagementSidebar"));
const ShortsSettings = lazy(() => import("./AdminPage/ShortsSettings"));
const BannerManagement = lazy(() => import("./AdminPage/BannerManagement"));
const UnifiedBannerManagement = lazy(() => import("./AdminPage/UnifiedBannerManagement"));
const InsightsNews = lazy(() => import("./Insight/pages/InsightsNews"));
const InsightsGuides = lazy(() => import("./Insight/pages/InsightsGuides"));
const InsightsManagement = lazy(() => import("./Insight/admin/InsightsManagement"));
const InsightsPriceTrendsBanners = lazy(() => import("./Insight/admin/InsightsPriceTrendsBanners"));
const Contacts = lazy(() => import("./Insight/components/Contacts"));
const EnquiryManagement = lazy(() => import("./Insight/components/EnquiryManagement"));
const MarketReportsAdmin = lazy(() => import("./Insight/pages/Admin/MarketReportsAdmin"));
const AdminGuides = lazy(() => import("./Insight/pages/Admin/AdminGuides"));
const AdminJobPosting = lazy(() => import("./AdminPage/AdminJobPosting"));
const AdminJobPostingView = lazy(() => import("./AdminPage/AdminJobPostingView"));
const AdminJobPostingEdit = lazy(() => import("./AdminPage/AdminJobPostingEdit"));
const S3Manager = lazy(() => import("./AdminPage/S3Manager"));
const SitemapManagement = lazy(() => import("./AdminPage/SitemapManagement"));
const Onboarding = lazy(() => import("./Hr/Onboarding"));
const Offboarding = lazy(() => import("./Hr/Offboarding"));
const ItDashboard = lazy(() => import("./Hr/ItDashboard"));
const AccountsDashboard = lazy(() => import("./Hr/AccountsDashboard"));
const LeaveManagement = lazy(() => import("./Hr/LeaveManagement"));
const HrEmployees = lazy(() => import("./Hr/HrEmployees"));
const OnboardingUpload = lazy(() => import("./OnboardingUpload"));
const DocumentUpload = lazy(() => import("./Pages/DocumentUpload"));
const UploadSuccess = lazy(() => import("./Pages/UploadSuccess"));
// Sales Head Components
const SalesHeadLayout = lazy(() => import("./SalesHeadPage/SalesHeadLayout"));
const SalesHeadDashboard = lazy(() => import("./SalesHeadPage/SalesHeadDashboard"));
const SalesHeadHeader = lazy(() => import("./SalesHeadPage/SalesHeadHeader"));
const SalesHeadProjects = lazy(() => import("./SalesHeadPage/SalesHeadProjects"));
const SalesHeadEnquiries = lazy(() => import("./SalesHeadPage/SalesHeadEnquiries"));
const ListedProperties = lazy(() => import("./SalesHeadPage/ListedProperties"));
const ViewProperty = lazy(() => import("./SalesHeadPage/ViewProperty"));
const EditProperty = lazy(() => import("./SalesHeadPage/EditProperty"));
// Test Component
const TestSalesHead = lazy(() => import("./Components/TestSalesHead"));
import ProjectRouter from "./Pages/ProjectRouter";
import DubaiPage from "./Pages/Dubai/DubaiPage";

// Property Types Pages
const BhkFlatsGurgaon = lazy(() => import("./Pages/PropertyTypes/BhkFlatsGurgaon"));
const FurnishedFlatsGurgaon = lazy(() => import("./Pages/PropertyTypes/FurnishedFlatsGurgaon"));
const PenthouseGurgaon = lazy(() => import("./Pages/PropertyTypes/PenthouseGurgaon"));
const IndependentFloorGurgaon = lazy(() => import("./Pages/PropertyTypes/IndependentFloorGurgaon"));
const IndependentHousesGurgaon = lazy(() => import("./Pages/PropertyTypes/IndependentHousesGurgaon"));
const BudgetFlatsGurgaon = lazy(() => import("./Pages/PropertyTypes/BudgetFlatsGurgaon"));
const AffordableHomesGurgaon = lazy(() => import("./Pages/PropertyTypes/AffordableHomesGurgaon"));
const AffordableHomes = lazy(() => import("./Pages/PropertyTypes/AffordableHomes"));
const FarmhouseGurgaon = lazy(() => import("./Pages/PropertyTypes/FarmhouseGurgaon"));
const LuxuryVillasGurgaon = lazy(() => import("./Pages/PropertyTypes/LuxuryVillasGurgaon"));
const ResidentialFlatsGurgaon = lazy(() => import("./Pages/PropertyTypes/ResidentialFlatsGurgaon"));
const RetailShopsGurgaon = lazy(() => import("./Pages/PropertyTypes/RetailShopsGurgaon"));
const BuilderFloorGurgaon = lazy(() => import("./Pages/PropertyTypes/BuilderFloorGurgaon"));
const IndustrialPlotsGurgaon = lazy(() => import("./Pages/PropertyTypes/IndustrialPlotsGurgaon"));
const SCOPlotsGurgaon = lazy(() => import("./Pages/PropertyTypes/SCOPlotsGurgaon"));
const ShopCumOfficePlotsGurgaon = lazy(() => import("./Pages/PropertyTypes/ShopCumOfficePlotsGurgaon"));

// Initialize QueryClient
const queryClient = new QueryClient();

function App() {
  const location = useLocation();
  const currentPath = location?.pathname || "/";
  // Consider dynamic project pages like '/experion-the-trillion/' etc. (single segment with trailing slash)
  const singleSegment = /^\/[A-Za-z0-9-]+\/?$/.test(currentPath);
  const blockedPrefixes = [
    'blog', 'auth', 'projects', 'project', 'property', 'property-types', 'loan', 'contact-us', 'userdashboard', 'admin', 'emi-calculator', 'postproperty', 'news-and-articals', 'searchdata', 'developers', 'privacy-policy', 'terms-and-conditions', 'qr-generator', 'hi'
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
                  <HotToaster position="top-right" />
                  

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
                            <Navigate to="/" replace={true} />
                          )
                        }
                      />
                      <Route path="/auth/">
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
                        <Route path="signin/" element={<div>Signin commented out</div>} />
                      </Route>
                      <Route path="/privacy-policy/" element={<Privacy />} />
                      <Route path="/disclaimer/" element={<Disclaimer />} />
                      <Route
                        path="/terms-and-conditions/"
                        element={<TermsAndConditions />}
                      />
                      <Route path="/projects-in-gurugram/" element={<CityProjectsGlobal />} />
                      <Route
                        path="/projects-in-gurugram/budget"
                        element={<BudgetPrice />}
                      />
                      <Route
                        path="/budget-properties/under-1-cr"
                        element={<GlobalBudgetPrice />}
                      />
                      <Route
                        path="/budget-properties/1-5-cr"
                        element={<GlobalBudgetPrice />}
                      />
                      <Route
                        path="/budget-properties/5-10-cr"
                        element={<GlobalBudgetPrice />}
                      />
                      <Route
                        path="/budget-properties/10-20-cr"
                        element={<GlobalBudgetPrice />}
                      />
                      <Route
                        path="/budget-properties/20-50-cr"
                        element={<GlobalBudgetPrice />}
                      />
                      <Route
                        path="/budget-properties/above-50-cr"
                        element={<GlobalBudgetPrice />}
                      />
                      {/* Unified projects/{filter} routes */}
                      <Route
                        path="/projects/under-1-cr/"
                        element={<GlobalBudgetPrice />}
                      />
                      <Route
                        path="/projects/1-5-cr/"
                        element={<GlobalBudgetPrice />}
                      />
                      <Route
                        path="/projects/5-10-cr/"
                        element={<GlobalBudgetPrice />}
                      />
                      <Route
                        path="/projects/10-20-cr/"
                        element={<GlobalBudgetPrice />}
                      />
                      <Route
                        path="/projects/20-50-cr/"
                        element={<GlobalBudgetPrice />}
                      />
                      <Route
                        path="/projects/above-50-cr/"
                        element={<GlobalBudgetPrice />}
                      />
                      <Route
                        path="/projects-in-gurugram/property-possession-after-2026/"
                        element={<PossessionAfter2028 />}
                      />
                      <Route
                        path="/projects-in-gurugram/property-possession-in-2024/"
                        element={<Navigate to="/projects/ready-to-move/" replace />}
                      />
                      <Route
                        path="/projects-in-gurugram/property-possession-in-2024"
                        element={<Navigate to="/projects/ready-to-move/" replace />}
                      />
                      <Route
                        path="/developers/:builderName"
                        element={<BuilderPage />}
                      />
                      <Route path="/max-estates/" element={<BuilderPage />} />
                      <Route
                        path="/projects-in-gurugram/property-possession-in-2025/"
                        element={<Possessionin2025 />}
                      />
                      <Route
                        path="/projects-in-gurugram/property-possession-in-2026/"
                        element={<Possessionin2026 />}
                      />
                      {/* Redirects to home page */}
                      <Route path="/property/residential/" element={<Navigate to="/" replace />} />
                      <Route path="/property/residential" element={<Navigate to="/" replace />} />
                      <Route path="/projects-status/newlaunch-projects/" element={<Navigate to="/" replace />} />
                      <Route path="/projects-status/newlaunch-projects" element={<Navigate to="/" replace />} />
                      <Route path="/sco/plots" element={<Navigate to="/" replace />} />
                      <Route path="/sco/plots/" element={<Navigate to="/" replace />} />
                      <Route
                        path="/rental-properties/best-rental-property-in-gurugram/"
                        element={<RentPropViewCard />}
                      />
                      <Route
                        path="/buy-properties/best-resale-property-in-gurugram/"
                        element={<BuyPropViewCard />}
                      />
                      <Route path="/about-us/" element={<AboutModern />} />
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
                        path="/projects/residential/"
                        element={<ProjectTypeGlobal />}
                      />
                      <Route
                        path="/projects/commercial/"
                        element={<ProjectTypeGlobal />}
                      />
                      <Route path="/projects/sco-plots/" element={<ProjectTypeGlobal />} />
                      {/* <Route path="/dlf-homes-sco-plots/" element={<DlfSco />} /> */}
                      <Route
                        path="/projects/independent-floors/"
                        element={<ProjectTypeGlobal />}
                      />
                      <Route path="/projects-in-delhi/" element={<CityProjectsGlobal />} />
                      <Route path="/united-arab-emirates/" element={<DubaiPage />} />
                      {/* Redirect deleted Dubai routes to home */}
                      <Route path="/projects-in-dubai" element={<Navigate to="/" replace />} />
                      <Route path="/dubai/insights" element={<Navigate to="/" replace />} />
                      <Route path="/dubai/developers" element={<Navigate to="/" replace />} />
                      <Route path="/dubai/contact" element={<Navigate to="/" replace />} />
                       <Route path="/projects-in-goa/" element={<CityProjectsGlobal />} />
                      <Route path="/projects-in-noida/" element={<CityProjectsGlobal />} />
                      <Route path="/projects-in-panipat/" element={<CityProjectsGlobal />} />
                      <Route path="/projects-in-panchkula/" element={<CityProjectsGlobal />} />
                      <Route path="/projects-in-kasauli/" element={<CityProjectsGlobal />} />
                      <Route path="/projects-in-sonipat/" element={<CityProjectsGlobal />} />
                      <Route path="/projects-in-karnal/" element={<CityProjectsGlobal />} />
                      <Route path="/projects-in-jalandhar/" element={<CityProjectsGlobal />} />
                      <Route path="/projects-in-ayodhya/" element={<CityProjectsGlobal />} />
                      <Route path="/projects-in-mumbai/" element={<CityProjectsGlobal />} />
                      <Route path="/projects-in-pune/" element={<CityProjectsGlobal />} />
                      <Route path="/projects-in-alwar/" element={<CityProjectsGlobal />} />
                      {/* Dynamic city projects route (generic template). Keep after specific routes to avoid conflicts. */}
                      <Route path="/projects-in-:citySlug/" element={<CityProjectsGlobal />} />
                      <Route path="/projects-in-:citySlug/" element={<CityProjectsGlobal />} />
                      <Route path="/projects-in-pushkar/" element={<CityProjectsGlobal />} />
                      <Route path="/qr-generator" element={<QRGeneratorPage />} />
                      <Route path="/emi-calculator/" element={<EMICalculatorPage />} />
                      {/* Contact Card Route - Multiple Templates */}
                      <Route path="/hi/:slug" element={
                        <LazyLoad>
                          <UnifiedContactCard />
                        </LazyLoad>
                      } />
                      {/* Analytics (public) */}
                      <Route path="/property-market-trends/" element={<AnalyticsHome />} />
                      <Route path="/analytics/price-trends" element={<PriceTrends />} />
                      <Route path="/analytics/market" element={<MarketAnalytics />} />
                      <Route path="/analytics/location" element={<LocationIntelligence />} />
                      <Route path="/analytics/investment" element={<InvestmentInsights />} />
                      <Route path="/loan-eligibility" element={<LoanEligibility />} />
                      
                      {/* Unified status routes with projects/{filter} pattern */}
                      <Route
                        path="/projects/upcoming/"
                        element={<ProjectStatusSearchGlobal />}
                      />
                      <Route
                        path="/projects/underconstruction/"
                        element={<ProjectStatusSearchGlobal />}
                      />
                      <Route
                        path="/projects/ready-to-move/"
                        element={<ProjectStatusSearchGlobal />}
                      />
                      <Route
                        path="/projects/newlaunch/"
                        element={<ProjectStatusSearchGlobal />}
                      />
                      
                      <Route path="/plots-in-gurugram/" element={<ProjectTypeGlobal />} />
                      <Route path="/projects/villas/" element={<ProjectTypeGlobal />} />
                      <Route path="/projects/farmhouse/" element={<ProjectTypeGlobal />} />
                      <Route path="/projects/farmhouses/" element={<ProjectTypeGlobal />} />
                      <Route path="/projects/affordable-homes/" element={<AffordableHomes />} />
                      <Route path="/projects/industrial-plots/" element={<ProjectTypeGlobal />} />
                      <Route path="/projects/industrial-projects/" element={<ProjectTypeGlobal />} />
                      <Route path="/news-and-articals/" element={<NewsandArtical />} />
                      {/* New dynamic project type routes */}
                      <Route path="/project-type/:type" element={<ProjectTypeGlobal />} />
                      <Route path="/project-types-demo" element={<ProjectTypeDemo />} />
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
                      <Route path="/blog/" element={<ModernBlogPage />} />
                      {/* Place static path before dynamic ones to avoid '/blog/write' matching ':slug' */}
                      <Route path="/blog/write" element={<BlogWrite />} />
                      {/* Direct ID access - must come before slug to avoid conflicts */}
                      <Route path="/blog/:id" element={<ModernBlogView />} />
                      {/* Handle slug-only URLs like /blog/my-blog-slug */}
                      <Route path="/blog/:slug" element={<ModernBlogView />} />
                      {/* Handle slug/id URLs like /blog/my-blog-slug/67f7bd08edb6d0442ad0012e */}
                      <Route path="/blog/:slug/:id" element={<ModernBlogView />} />
                      <Route path="/blogging" element={<Blogging />} />
                      <Route path="/blog-insights" element={<BlogInsights />} />
                      <Route path="/insights/price-trends" element={<PriceTrends />} />
                      <Route path="/insights/property-insights" element={<AnalyticsHome />} />
                      <Route path="/insights/news" element={<InsightsNews />} />
                      <Route path="/insights/guides" element={<InsightsGuides />} />
                      <Route
                        path="/resetpassword/:token"
                        element={<ForgetPassword />}
                      />
                      <Route path="/forgetpassword" element={<ResetEmailPassword />} />
                      <Route path="/knowabouts" element={<PropertyKnow />} />

                      <Route path="/test-sales-head" element={<LazyLoad><TestSalesHead /></LazyLoad>} />
                      <Route path="/:pUrl/" element={<ProjectLayout2 />} />

                      <Route
                        path="/userviewproperty/:id"
                        element={<UserViewProperty />}
                      />
                      <Route path="/usereditproperty" element={<UserEditProperty />} />
                      <Route path="/property-in-gurugram/*" element={<Navigate to="/" replace />} />
                      <Route path="*" element={<PageNotFound />} />
                      <Route path="/contactmainpage" element={<ContactPage />} />
                      <Route path="/searchdata/:key" element={<SearchData />} />
                       <Route path="/bptp-plots-gurugram/" element={<Bptp />} />
                       <Route path="/orris-plots-gurugram/" element={<Orris />} />
                       <Route path="/top-luxury-projects/" element={<LuxuryProject />} />
                      <Route path="/onboarding/upload" element={<OnboardingUpload />} />
                      <Route path="/document-upload/:token" element={<DocumentUpload />} />
                      <Route path="/upload-success" element={<UploadSuccess />} />
                      

                      {/* Property Types Routes */}
                      <Route path="/1-bhk-flats-in-gurgaon/" element={<BhkFlatsGurgaon bhkType="1" />} />
                      <Route path="/2-bhk-flats-in-gurgaon/" element={<BhkFlatsGurgaon bhkType="2" />} />
                      <Route path="/3-bhk-flats-in-gurgaon/" element={<BhkFlatsGurgaon bhkType="3" />} />
                      <Route path="/4-bhk-flats-in-gurgaon/" element={<BhkFlatsGurgaon bhkType="4" />} />
                      <Route path="/5-bhk-flats-in-gurgaon/" element={<BhkFlatsGurgaon bhkType="5" />} />
                      <Route path="/property-types/fully-furnished-flats-gurgaon/" element={<FurnishedFlatsGurgaon furnishingType="Fully Furnished" />} />
                      <Route path="/property-types/semi-furnished-flats-gurgaon/" element={<FurnishedFlatsGurgaon furnishingType="Semi Furnished" />} />
                      <Route path="/property-types/unfurnished-flats-gurgaon/" element={<FurnishedFlatsGurgaon furnishingType="Unfurnished" />} />
                      <Route path="/property-types/penthouse-gurgaon/" element={<PenthouseGurgaon />} />
                      <Route path="/property-types/independent-floor-gurgaon/" element={<IndependentFloorGurgaon />} />
                      <Route path="/property-types/independent-houses-gurgaon/" element={<IndependentHousesGurgaon />} />
                      <Route path="/property-types/flats-under-1-cr-gurgaon/" element={<BudgetFlatsGurgaon budgetRange="1" />} />
                      <Route path="/property-types/flats-under-5-cr-gurgaon/" element={<BudgetFlatsGurgaon budgetRange="5" />} />
                      <Route path="/property-types/flats-under-10-cr-gurgaon/" element={<BudgetFlatsGurgaon budgetRange="10" />} />
                      <Route path="/property-types/flats-under-20-cr-gurgaon/" element={<BudgetFlatsGurgaon budgetRange="20" />} />
                      <Route path="/property-types/affordable-homes-gurgaon/" element={<AffordableHomesGurgaon />} />
                      <Route path="/property-types/farmhouse-gurgaon/" element={<FarmhouseGurgaon />} />
                      <Route path="/property-types/luxury-villas-gurgaon/" element={<LuxuryVillasGurgaon />} />
                      <Route path="/property-types/residential-flats-gurgaon/" element={<ResidentialFlatsGurgaon />} />
                      <Route path="/property-types/retail-shops-gurgaon/" element={<RetailShopsGurgaon />} />
                      <Route path="/property-types/builder-floor-gurgaon/" element={<BuilderFloorGurgaon />} />
                      <Route path="/property-types/industrial-plots-gurgaon/" element={<IndustrialPlotsGurgaon />} />
                      <Route path="/property-types/sco-plots-gurgaon/" element={<SCOPlotsGurgaon />} />
                      <Route path="/property-types/shop-cum-office-plots-gurgaon/" element={<ShopCumOfficePlotsGurgaon />} />
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
                      {/* <Route path="blog-enquiries" element={<LazyLoad><BlogEnquiries /></LazyLoad>} /> */}
                      <Route path="OtherEnquiries" element={<LazyLoad><OtherEnquiries /></LazyLoad>} />
                      <Route path="header" element={<LazyLoad><Header /></LazyLoad>} />
                      <Route path="Projects/property" element={<LazyLoad><Projects /></LazyLoad>} />
                      <Route path="resale-enquiries" element={<LazyLoad><Rent /></LazyLoad>} />
                      {/* <Route path="jobposting" element={<LazyLoad><JobPosting /></LazyLoad>} /> */}
                      <Route path="blog" element={<LazyLoad><Blog /></LazyLoad>} />
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
                      <Route path="banner-management" element={<LazyLoad><BannerManagement /></LazyLoad>} />
                      <Route path="unified-banner-management" element={<LazyLoad><UnifiedBannerManagement /></LazyLoad>} />
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
                        path="project-order-management"
                        element={<LazyLoad><ProjectOrderManagement /></LazyLoad>}
                      />
                      <Route
                        path="dashboard"
                        element={<LazyLoad><AdminDashboard /></LazyLoad>}
                      />
                      <Route
                        path="insights"
                        element={<LazyLoad><InsightsManagement /></LazyLoad>}
                      />
                      <Route
                        path="insights/InsightsPriceTrendsBanners"
                        element={<LazyLoad><InsightsPriceTrendsBanners /></LazyLoad>}
                      />
                      <Route
                        path="s3-manager"
                        element={<LazyLoad><S3Manager /></LazyLoad>}
                      />
                      <Route
                        path="insights/EnquiryManagement"
                        element={<LazyLoad><EnquiryManagement /></LazyLoad>}
                      />
                      <Route
                        path="insights/contacts"
                        element={<LazyLoad><Contacts /></LazyLoad>}
                      />
                      <Route
                        path="insights/market-reports"
                        element={<LazyLoad><MarketReports /></LazyLoad>}
                      />
                      <Route
                        path="insights/investment"
                        element={<LazyLoad><InvestmentInsights /></LazyLoad>}
                      />
                      <Route path="jobposting" element={<LazyLoad><AdminJobPosting /></LazyLoad>} />
                      <Route path="jobposting/view/:id" element={<LazyLoad><AdminJobPostingView /></LazyLoad>} />
                      <Route path="jobposting/edit/:id" element={<LazyLoad><AdminJobPostingEdit /></LazyLoad>} />
                      <Route path="contact-cards" element={<LazyLoad><ContactCardManagement /></LazyLoad>} />
                      <Route path="sitemap-management" element={<LazyLoad><SitemapManagement /></LazyLoad>} />
                      </Route>

                    {/* Sales Head Routing */}
                    <Route path="/sales-head" element={<SalesHeadPrivateRoute />}>
                      <Route index element={<LazyLoad><SalesHeadDashboard /></LazyLoad>} />
                      <Route path="dashboard" element={<LazyLoad><SalesHeadDashboard /></LazyLoad>} />
                      <Route path="sales-team" element={<div className="p-6"><h1 className="text-3xl font-bold text-gray-800 dark:text-white">Sales Team Management</h1><p className="mt-4 text-gray-600 dark:text-gray-300">Manage your sales team members and performance.</p></div>} />
                      <Route path="sales-performance" element={<div className="p-6"><h1 className="text-3xl font-bold text-gray-800 dark:text-white">Sales Performance</h1><p className="mt-4 text-gray-600 dark:text-gray-300">Track and analyze sales performance metrics.</p></div>} />
                      <Route path="projects" element={<LazyLoad><SalesHeadProjects /></LazyLoad>} />
                      <Route path="listed-projects" element={<LazyLoad><SalesHeadAllListedProperties /></LazyLoad>} />
                      <Route path="listed-properties" element={<LazyLoad><ListedProperties /></LazyLoad>} />
                      <Route path="view-property/:id" element={<LazyLoad><ViewProperty /></LazyLoad>} />
                      <Route path="edit-property/:id" element={<LazyLoad><EditProperty /></LazyLoad>} />
                      <Route path="enquiries" element={<LazyLoad><SalesHeadEnquiries /></LazyLoad>} />
                      <Route path="resale-enquiries" element={<LazyLoad><SalesHeadResaleEnquiries /></LazyLoad>} />
                      <Route path="registered-users" element={<LazyLoad><SalesHeadRegisteredUsers /></LazyLoad>} />
                      <Route path="revenue" element={<div className="p-6"><h1 className="text-3xl font-bold text-gray-800 dark:text-white">Revenue</h1><p className="mt-4 text-gray-600 dark:text-gray-300">Track revenue and financial performance.</p></div>} />
                      <Route path="analytics" element={<div className="p-6"><h1 className="text-3xl font-bold text-gray-800 dark:text-white">Analytics</h1><p className="mt-4 text-gray-600 dark:text-gray-300">View detailed sales analytics and insights.</p></div>} />
                      <Route path="reports" element={<div className="p-6"><h1 className="text-3xl font-bold text-gray-800 dark:text-white">Reports</h1><p className="mt-4 text-gray-600 dark:text-gray-300">Generate and view sales reports.</p></div>} />
                    </Route>

                    {/* HR Department Routing */}
                    <Route path="/hr" element={<HrPrivateRoute />}>
                      <Route index element={<LazyLoad><Hr /></LazyLoad>} />
                      <Route path="dashboard" element={<LazyLoad><HrDashboard /></LazyLoad>} />
                      <Route path="jobposting" element={<LazyLoad><HrJobPosting /></LazyLoad>} />
                      <Route path="jobposting/view/:id" element={<LazyLoad><JobPostingView /></LazyLoad>} />
                      <Route path="jobposting/applications/:id" element={<LazyLoad><JobApplications /></LazyLoad>} />
                      <Route path="jobposting/edit/:id" element={<LazyLoad><JobPostingEdit /></LazyLoad>} />
                      <Route path="onboarding" element={<LazyLoad><Onboarding /></LazyLoad>} />
                      <Route path="offboarding" element={<LazyLoad><Offboarding /></LazyLoad>} />
                      <Route path="it" element={<LazyLoad><ItDashboard /></LazyLoad>} />
                      <Route path="accounts" element={<LazyLoad><AccountsDashboard /></LazyLoad>} />
                      <Route path="leave" element={<LazyLoad><LeaveManagement /></LazyLoad>} />
                      <Route path="leave-management" element={<LazyLoad><LeaveManagement /></LazyLoad>} />
                      <Route path="employees" element={<LazyLoad><HrEmployees /></LazyLoad>} />
                      <Route path="payroll" element={<div className="p-6"><h1 className="text-3xl font-bold text-gray-800 dark:text-white">Payroll Management</h1><p className="mt-4 text-gray-600 dark:text-gray-300">Handle payroll processing and salary management.</p></div>} />
                      <Route path="attendance" element={<div className="p-6"><h1 className="text-3xl font-bold text-gray-800 dark:text-white">Attendance Management</h1><p className="mt-4 text-gray-600 dark:text-gray-300">Track employee attendance and working hours.</p></div>} />
                      <Route path="recruitment" element={<div className="p-6"><h1 className="text-3xl font-bold text-gray-800 dark:text-white">Recruitment</h1><p className="mt-4 text-gray-600 dark:text-gray-300">Manage job postings and recruitment process.</p></div>} />
                      <Route path="reports" element={<div className="p-6"><h1 className="text-3xl font-bold text-gray-800 dark:text-white">HR Reports</h1><p className="mt-4 text-gray-600 dark:text-gray-300">Generate and view HR analytics and reports.</p></div>} />
                    </Route>

                    {/* Admin route for Guides */}
                    <Route path="/Admin/insights/guides" element={<LazyLoad><AdminGuides /></LazyLoad>} />

                    {/* Admin route for Market Reports */}
                    <Route path="/admin/insights/market-report-generator" element={<LazyLoad><MarketReportsAdmin /></LazyLoad>} />

                    {/* Admin route for Project Filter Order Management */}
                    <Route path="/Admin/project-filter-order" element={<LazyLoad><ProjectFilterOrderManagement /></LazyLoad>} />

                    
                    {/* Blog route only user with role Blog will be able to login */}
                    <Route path="/seo/" element={<SeoPrivateRoute />}>
                      <Route path="blogs" element={<BlogManagementSidebar />} >
                        <Route index element={<BlogDashboard />} />
                        <Route path="dashboard" element={<BlogDashboard />} />
                        <Route path="manage" element={<BlogManagement />} />
                        <Route path="write" element={<BlogWriteModal />} />
                        <Route path="view/:id" element={<ModernBlogView />} />
                        <Route path="edit/:id" element={<BlogWriteModal />} />
                        <Route path="drafts" element={<DraftManagement />} />
                      </Route>
                    </Route>
                  <Route path="/:pUrl/" element={<ProjectLayout2 />} />
                </Routes>
                </Suspense>
              </ErrorBoundary>
            </QueryClientProvider>
          </TooltipProvider>
          {!isProjectPage && <MobileBottomNav />}
        </AuthProvider>
      </DataProvider>
    </>
  );
}

export default App;

// Mobile bottom navigation (visible only on small screens)
function MobileBottomNav() {
  const location = useLocation();
  const path = location.pathname || "/";
  const token = typeof window !== "undefined" ? localStorage.getItem("myToken") : null;
  const [showAuth, setShowAuth] = React.useState(false);

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
  const likedTarget = token ? "/userdashboard/?tab=liked" : null;
  const profileTarget = token ? "/userdashboard/" : null;

  const handleLikedClick = (e) => {
    if (!token) {
      e.preventDefault();
      setShowAuth(true);
    }
  };

  const handleProfileClick = (e) => {
    if (!token) {
      e.preventDefault();
      setShowAuth(true);
    }
  };

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

            {/* UAE */}
            <Link to="/united-arab-emirates/" className="flex flex-col items-center gap-1 py-2">
              <span className={`text-xl ${isActive("/united-arab-emirates") ? "text-red-600" : "text-gray-500"}`}>
                <img src="/icons/noun-burj-khalifa-3945.svg" width="20" height="20" alt="UAE" style={{ filter: isActive("/united-arab-emirates") ? 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)' : 'brightness(0) saturate(100%) invert(60%) sepia(8%) saturate(872%) hue-rotate(169deg) brightness(99%) contrast(86%)' }} />
              </span>
              <span className={`${isActive("/united-arab-emirates") ? "text-gray-900 font-semibold" : ""}`}>UAE</span>
            </Link>

            {/* Center CTA: Contact (call by phone) */}
            <div className="flex flex-col items-center justify-center -mt-6">
              <a
                href="tel:+918500900100"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-lg ring-4 ring-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                aria-label="Call 8500900100"
                title="Call 8500900100"
              >
                <i className="fa-solid fa-phone text-lg" aria-hidden="true"></i>
              </a>
              <span className="mt-1 text-[11px]">Contact</span>
            </div>

            {/* Blogs */}
            <Link to="/blog/" className="flex flex-col items-center gap-1 py-2">
              <span className={`text-xl ${isActive("/blog") ? "text-red-600" : "text-gray-500"}`}>
                <i className="fa-solid fa-blog"></i>
              </span>
              <span className={`${isActive("/blog") ? "text-gray-900 font-semibold" : ""}`}>Blogs</span>
            </Link>

            {/* Profile */}
            {token ? (
              <Link to={profileTarget} className="flex flex-col items-center gap-1 py-2">
                <span className={`text-xl ${isActive("/userdashboard") ? "text-red-600" : "text-gray-500"}`}>
                  <i className="fa-solid fa-user"></i>
                </span>
                <span className={`${isActive("/userdashboard") ? "text-gray-900 font-semibold" : ""}`}>Profile</span>
              </Link>
            ) : (
              <button onClick={handleProfileClick} className="flex flex-col items-center gap-1 py-2">
                <span className="text-xl text-gray-500">
                  <i className="fa-solid fa-user"></i>
                </span>
                <span>Profile</span>
              </button>
            )}
          </div>
        </div>
      </div>
      <AuthModal open={showAuth} onClose={() => setShowAuth(false)} defaultView="login" />
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
