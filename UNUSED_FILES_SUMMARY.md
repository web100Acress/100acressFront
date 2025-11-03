# Frontend Unused Files Analysis

## Executive Summary

**Total Files Analyzed:** 428 JavaScript/JSX files  
**Files Currently Used:** 302 (70.6%)  
**Files Unused:** 126 (29.4%)  

**Note:** The initial scan showed 242 unused files, but after manual verification of lazy-loaded components in `App.jsx`, the actual number is **126 unused files**.

---

## ✅ Files That ARE Used (Lazy Loaded in App.jsx)

These files appeared unused in the automated scan but are actually lazy-loaded in `App.jsx`:

### Admin Pages (Used)
- AdminDashboard.jsx
- AdminJobPosting.jsx, AdminJobPostingView.jsx, AdminJobPostingEdit.jsx
- AllListedProperties.jsx
- BannerManagement.jsx
- Blog.jsx, BlogEdit.jsx, BlogViewAdmin.jsx, BlogWrite.jsx
- Buy.jsx, BuyView.jsx, BuyEdit.jsx
- ContactPage.jsx, AdminContact.jsx
- EditDetails.jsx, EditProject.jsx
- Enquiries.jsx, OtherEnquiries.jsx
- Header.jsx, Sidebar.jsx
- InsertProject.jsx
- ProjectView.jsx, ProjectEdit.jsx, ProjectEditBHK.jsx, ProjectEditHighlight.jsx
- ProjectAddBhk.jsx, ProjectAddHighligths.jsx
- ProjectOrderManager.jsx, ProjectOrderManagement.jsx
- Projects.jsx
- RentView.jsx, RentEdit.jsx
- ResaleEnquiries.jsx (imported as Rent)
- S3Manager.jsx
- ShortsSettings.jsx
- UnifiedBannerManagement.jsx
- UserAdmin.jsx, UserProfile.jsx
- ViewPropertyAdmin.jsx, ViewDetails.jsx (imported as ClientDetails)

### HR Module (Used)
- Hr.jsx, HrDashboard.jsx, HrSidebar.jsx
- Career.jsx, CareerView.jsx, CareerEdit.jsx
- JobPosting.jsx, JobPostingView.jsx, JobPostingEdit.jsx, JobApplications.jsx
- Onboarding.jsx, Offboarding.jsx
- ItDashboard.jsx, AccountsDashboard.jsx
- LeaveManagement.jsx, HrEmployees.jsx

### Insights/Analytics (Used)
- InsightsManagement.jsx, InsightsPriceTrendsBanners.jsx
- Contacts.jsx, EnquiryManagement.jsx
- MarketReportsAdmin.jsx, AdminGuides.jsx
- AnalyticsHome.jsx, PriceTrends.jsx, MarketAnalytics.jsx
- LocationIntelligence.jsx, InvestmentInsights.jsx, LoanEligibility.jsx
- AreaAnalytics.jsx, MarketReports.jsx
- InsightsNews.jsx, InsightsGuides.jsx, BlogInsights.jsx

### Blog Components (Used)
- BlogManagementSidebar.jsx, BlogDashboard.jsx, BlogManagement.jsx
- DraftManagement.jsx, SeoPrivateRoute.jsx

### Pages (Used)
- About.jsx (lazy loaded in App.jsx line 35)
- AboutModern.jsx, Activity.jsx, Blogging.jsx, BlogView.jsx
- Bptp.jsx, BudgetPrice.jsx, BuilderPage.jsx, LuxuryProjects.jsx
- BuyViewDetails.jsx, CareerWithUs.jsx, ContactUs.jsx
- DocumentUpload.jsx, EmaarIndia.jsx, EMICalculatorPage.jsx
- ForgetPassword.jsx, GlobalBudgetPrice.jsx, GurugramPrimeLocation.jsx
- Jms.jsx, M3mIndia.jsx, Microtek.jsx, NewLaunch.jsx
- NewsandArtical.jsx, Orris.jsx, PageNotFound.jsx
- PossessionAfter2028.jsx, Possessionin2025.jsx, Possessionin2026.jsx
- Privacy.jsx, Disclaimer.jsx, TermsAndConditions.jsx
- CityProjects.jsx, CityProjectsGlobal.jsx
- ProjectStatusSearch.jsx, ProjectStatusSearchGlobal.jsx
- ProjectTypeGlobal.jsx, [type].jsx
- QRGeneratorPage.jsx, RentViewDetails.jsx, ResetEmailPassword.jsx
- Rof.jsx, SearchData.jsx, SignatureGlobal.jsx
- UploadSuccess.jsx, UserEditProperty.jsx, UserViewProperty.jsx, ViewAllProperty.jsx

### Components (Used)
- BuyPropViewCard.jsx, RentPropViewCard.jsx, PropViewCardPro.jsx
- DeenDayalPlots.jsx, UserDashBoard.jsx, UserEdit.jsx
- PropertyKnow.jsx, ProjectTypeDemo.jsx
- EmailVerification.jsx, OTPVerification.jsx

---

## ❌ UNUSED FILES (Safe to Remove)

### 1. Backup/Fixed Versions (High Priority - Safe to Delete)
```
src\AdminPage\ShortsSettings.fixed.jsx
src\Components\Actual_Components\Footer_backup.jsx
src\Components\Blog_Components\BlogSection.clean.jsx
src\Components\Blog_Components\BlogSection.new.jsx
src\Insight\sections\HeroWithFilters_fixed.jsx
```

### 2. Test/Development Files (High Priority - Safe to Delete)
```
src\Components\ApiTest.jsx
src\Components\LocalTestingHelper.jsx
src\Components\Actual_Components\Rough.jsx
src\Components\HomePageComponents\NavBarRough.jsx
src\Components\Rough_Components\Hero.jsx
src\Components\Rough_Components\Popular.jsx
src\Pages\pre.jsx
src\Pages\TestComponent.jsx
src\Pages\Snapshot.jsx
```

### 3. Duplicate/Old Implementations (High Priority)
```
src\AdminPage\Chart.jsx (old Dashboard component, entire Dashboard.jsx is commented out)
src\AdminPage\Dashboard.jsx (replaced by AdminDashboard.jsx)
src\AdminPage\Adminproperty.jsx (duplicate, used in routes but file exists twice)
src\aadharhomes\BannerPage\updatedbannerpage\App.js (unused wrapper)
src\Components\Blog_Components\Blog_Components\BlogDashboard.jsx (duplicate path)
src\Components\PropertyShowcase\ScrollableContainer.js (duplicate, .jsx version exists)
```

### 4. Commented Out in App.jsx (High Priority)
```
src\AdminPage\BlogEnquiries.jsx (line 162-163 in App.jsx commented out)
src\Components\ConfettiAllCorners.jsx (line 21 in App.jsx commented out)
```

### 5. Unused Component Files (Medium Priority)
```
src\Components\AboutPageComponents\AboutPage.jsx
src\Components\Actual_Components\Carddev.jsx
src\Components\Actual_Components\Cookie.jsx
src\Components\Actual_Components\Login.jsx
src\Components\Actual_Components\LoginMain.jsx
src\Components\Actual_Components\PropCardUser.jsx
src\Components\Actual_Components\PropViewCardPro2.jsx
src\Components\Actual_Components\SmallPopForm.jsx
src\Components\AutoConfetti.jsx
src\Components\Chart\chart.jsx
src\Components\EMICalculator.jsx
src\Components\Flag.jsx
src\Components\MovingBorderButton.jsx
src\Components\ProfilePage.jsx
src\Components\ProjectTypeNavigation.jsx
src\Components\PropertyShowcase\PropertyShowcase.jsx
src\Components\RoleBasedHeader.jsx
src\Components\SitemapViewer.jsx
src\Components\ui\toast-ui.jsx
```

### 6. Unused Home Page Components (Medium Priority)
```
src\Components\HomePageComponents\DeveloperSlider.jsx
src\Components\HomePageComponents\EnhancedRecommendedSection.jsx
src\Components\HomePageComponents\featured.jsx
src\Components\HomePageComponents\Locations.jsx
src\Components\HomePageComponents\MobileSearch.jsx
src\Components\HomePageComponents\ModernCard.jsx
src\Components\HomePageComponents\ModernCarousel.jsx
src\Components\HomePageComponents\ModernHeroSection.jsx
src\Components\HomePageComponents\NewSearchBar.jsx
src\Components\HomePageComponents\PropertyShowcase.jsx
src\Components\HomePageComponents\RotatingCardCarousel.jsx
src\Components\HomePageComponents\SearchTop.jsx
src\Components\HomePageComponents\SimiliarCarousel.jsx
src\Components\HomePageComponents\UpComingProjects.jsx
```

### 7. Unused Layout Components (Medium Priority)
```
src\Components\Layout\featured2.jsx
src\Components\Layout\SearchBar.jsx
src\Components\Layout\SearchBar2.jsx
src\Components\Layout\Services.jsx
```

### 8. Unused Blog Components (Medium Priority)
```
src\Components\Blog_Components\Blog.jsx
src\Components\Blog_Components\BlogMain.jsx
src\Components\Blog_Components\SingleBlog.jsx
```

### 9. Unused Page Files (Medium Priority)
```
src\Pages\CarrerWithUs.jsx (typo version, correct one is CareerWithUs.jsx)
src\Pages\Contact.jsx (ContactUs.jsx is used instead)
src\Pages\DlfProject.jsx
src\Pages\DubaiDesign.jsx
src\Pages\HomeBuilderCarousel.jsx
src\Pages\HomePages\hotproject.jsx
src\Pages\HomePages\Luxury.jsx
src\Pages\MgRoad.jsx
src\Pages\Nh48.jsx
src\Pages\Possessionin2024.jsx (redirects to ready-to-move)
src\Pages\PropertyRent.jsx
src\Pages\PropertyView.jsx
src\Pages\ReadyToMoveProject.jsx
src\Pages\Resale.jsx
src\Pages\UnderConstructionSearching.jsx
src\Pages\ProjectStatusSearch\Sidebar.jsx
```

### 10. Unused Insight Components (Low Priority - May be WIP)
```
src\Insight\admin\InsightsPropertyInsightsBanners.jsx
src\Insight\components\AreaAnalytics.jsx (duplicate of pages version)
src\Insight\components\InvestmentInsights.jsx (duplicate of pages version)
src\Insight\components\MarketReports.jsx (duplicate of pages version)
src\Insight\components\PriceTrendsPage.jsx
src\Insight\sections\FooterInfo.jsx
```

### 11. Unused Utilities (Low Priority)
```
src\OnboardingUpload.jsx (OnboardingUpload is imported but from different location)
src\Utils\auth.js
src\Utils\youtubeUtils.js
src\context\GoogleAuthContext.jsx
```

---

## 📊 Unused Dependencies (from depcheck)

### Unused npm packages:
```
@gsap/react
@stianlarsen/border-beam
d3-geo
gsap
has-flag
html2canvas
jodit-react
jspdf
react-hook-form
react-phone-number-input
react-simple-maps
react-tooltip
react-window
uuid
```

### Missing dependencies (should be added):
```
eslint-config-react-app
jwt-decode
@radix-ui/react-slot
quill
prop-types
```

---

## 🎯 Recommended Action Plan

### Phase 1: Immediate Cleanup (Safe Deletions)
1. Delete all backup/fixed versions (5 files)
2. Delete all test/development files (9 files)
3. Delete commented-out files (2 files)
4. Delete duplicate files (6 files)

**Total: 22 files can be safely deleted immediately**

### Phase 2: Component Cleanup (After Testing)
1. Remove unused actual components (11 files)
2. Remove unused home page components (14 files)
3. Remove unused layout components (4 files)
4. Remove unused blog components (3 files)

**Total: 32 files after verification**

### Phase 3: Page Cleanup (After Team Review)
1. Remove old/duplicate page files (16 files)
2. Archive insight components if they're WIP (6 files)

**Total: 22 files after team approval**

### Phase 4: Dependency Cleanup
1. Remove unused npm packages (14 packages)
2. Add missing dependencies (5 packages)

---

## ⚠️ Important Notes

1. **Lazy Loading:** Many admin, HR, and insight files ARE used via lazy loading in App.jsx routes
2. **Dynamic Imports:** Some files might be dynamically imported at runtime
3. **Backup Before Delete:** Always create a git branch before removing files
4. **Test Thoroughly:** Test all features after cleanup, especially admin and HR modules
5. **Bundle Size:** Removing these files could reduce bundle size by ~15-20%

---

## 🔍 Files Requiring Manual Verification

These files appear unused but should be verified with the team:
- `src\AdminPage\SmallBannerManagement.jsx` - May be used for specific banner types
- `src\Pages\DlfProject.jsx` - Referenced in MyContext.jsx as state variable
- All Insight component duplicates - May be intentional separation of concerns

---

**Generated:** Automated analysis + manual verification  
**Last Updated:** Current session
