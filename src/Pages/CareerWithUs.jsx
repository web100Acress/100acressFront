import React, { useEffect, useMemo, useState } from "react";
import Footer from "../Components/Actual_Components/Footer";
import { MapPin, Mail, Phone, X, Search, SlidersHorizontal, Filter, ChevronDown, Clock, Building2, Users, Briefcase, Eye, Calendar, Award, Target } from "lucide-react";
import { CarrierIcon } from "../Assets/icons";
import api from "../config/apiClient";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const CareerWithUs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [applyForId, setApplyForId] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", resumeUrl: "", coverLetter: "" });
  const [resumeFile, setResumeFile] = useState(null);
  const [closedJobInfo, setClosedJobInfo] = useState(null);

  // UI enhancement states
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [experienceFilter, setExperienceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [total, setTotal] = useState(0);
  const [serverTotalPages, setServerTotalPages] = useState(1);
  const [availableLocations, setAvailableLocations] = useState(["all"]);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get("/career/opening/ViewAll", {
          params: {
            q: debouncedSearch || undefined,
            loc: locationFilter !== 'all' ? locationFilter : undefined,
            exp: experienceFilter !== 'all' ? experienceFilter : undefined,
            sort: sortBy,
            page: currentPage,
            limit: pageSize,
          }
        });
        const arr = res?.data?.data || [];
        const meta = res?.data?.meta || {};
        setJobs(Array.isArray(arr) ? arr : []);
        setTotal(meta.total ?? arr.length);
        setServerTotalPages(meta.totalPages ?? 1);
        if (Array.isArray(meta.locationsDistinct)) {
          const locs = ["all", ...meta.locationsDistinct.filter(Boolean)];
          setAvailableLocations(locs);
        }
        if (meta.page && meta.page !== currentPage) setCurrentPage(meta.page);
      } catch (e) {
        console.error(e);
        setError("Failed to load openings.");
        setJobs([]);
        setTotal(0);
        setServerTotalPages(1);
      }
      setLoading(false);
    };
    fetchJobs();
  }, [debouncedSearch, locationFilter, experienceFilter, sortBy, currentPage, pageSize]);

  // Read initial filters from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    const loc = params.get('loc');
    const exp = params.get('exp');
    const sort = params.get('sort');
    const p = params.get('p');
    const ps = params.get('ps');
    if (q !== null) setSearch(q);
    if (loc) setLocationFilter(loc);
    if (exp) setExperienceFilter(exp);
    if (sort) setSortBy(sort);
    if (p) setCurrentPage(Math.max(1, parseInt(p, 10) || 1));
    if (ps) setPageSize(Math.max(1, parseInt(ps, 10) || 9));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Debounce search input for better UX
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => clearTimeout(t);
  }, [search]);

  // Persist filters + page in URL (replace history to avoid clutter)
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set('q', debouncedSearch);
    if (locationFilter !== 'all') params.set('loc', locationFilter);
    if (experienceFilter !== 'all') params.set('exp', experienceFilter);
    if (sortBy !== 'newest') params.set('sort', sortBy);
    if (currentPage > 1) params.set('p', String(currentPage));
    if (pageSize !== 9) params.set('ps', String(pageSize));
    const query = params.toString();
    const newUrl = query ? `?${query}` : '';
    navigate({ search: newUrl }, { replace: true });
  }, [debouncedSearch, locationFilter, experienceFilter, sortBy, currentPage, pageSize, navigate]);

  // Reset to first page when filters/search/sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, locationFilter, experienceFilter, sortBy]);

  const calculateDaysAgo = (postedDate) => {
    const currentDate = new Date();
    const postedOnDate = new Date(postedDate);
    const differenceInTime = currentDate - postedOnDate;
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    if (differenceInDays === 0) {
      const differenceInHours = Math.floor(differenceInTime / (1000 * 3600));
      if (differenceInHours === 0) {
        const differenceInMinutes = Math.floor(differenceInTime / (1000 * 60));
        return `${differenceInMinutes} min${differenceInMinutes > 1 ? 's' : ''} ago`;
      }
      return `${differenceInHours} hour${differenceInHours > 1 ? 's' : ''} ago`;
    }
    return `${differenceInDays} day${differenceInDays > 1 ? 's' : ''} ago`;
  };

  const submitApplication = async (e) => {
    e.preventDefault();
    if (!applyForId) return;

    const jobToApply = jobs.find((j) => j?._id === applyForId);
    if (jobToApply?.status === "closed") {
      setClosedJobInfo({
        title: jobToApply?.jobTitle || "This position",
        email: "support@100acress.com",
        phone: "+91 8500-900-100",
      });
      setFormError(
        "This position is currently closed. Please reach out to our support team for assistance."
      );
      return;
    }

    // basic validations
    setFormError("");
    const emailOk = /\S+@\S+\.\S+/.test(form.email);
    if (!form.name.trim()) {
      setFormError("Name is required.");
      return;
    }
    if (!emailOk) {
      setFormError("Please enter a valid email address.");
      return;
    }
    if (resumeFile) {
      const okTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      const maxBytes = 5 * 1024 * 1024; // 5MB
      if (!okTypes.includes(resumeFile.type)) {
        setFormError("Resume must be a PDF or Word document.");
        return;
      }
      if (resumeFile.size > maxBytes) {
        setFormError("Resume file size must be under 5MB.");
        return;
      }
    }
    try {
      setSubmitting(true);
      const fd = new FormData();
      fd.append('name', form.name);
      fd.append('email', form.email);
      if (form.phone) fd.append('phone', form.phone);
      if (form.coverLetter) fd.append('coverLetter', form.coverLetter);
      if (resumeFile) {
        fd.append('resume', resumeFile);
      } else if (form.resumeUrl) {
        // Fallback if no file is uploaded
        fd.append('resumeUrl', form.resumeUrl);
      } else {
        setFormError("Please provide either a resume file or a resume URL.");
        return;
      }

      await api.post(`/career/opening/${applyForId}/apply`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("Application submitted successfully! We will get back to you shortly.");
      setApplyForId(null);
      setClosedJobInfo(null);
      setForm({ name: "", email: "", phone: "", resumeUrl: "", coverLetter: "" });
      setResumeFile(null);
    } catch (err) {
      console.error(err);
      const code = err?.response?.data?.code;
      if (code === "JOB_CLOSED") {
        const support = err?.response?.data?.support || {};
        setClosedJobInfo({
          title: jobToApply?.jobTitle || "This position",
          email: support.email || "support@100acress.com",
          phone: support.phone || "+91 8500-900-100",
        });
        setFormError(err?.response?.data?.message || "This position is currently closed.");
      } else {
        setFormError(err?.response?.data?.message || "Failed to submit application. Please try again.");
      }
    }
    finally {
      setSubmitting(false);
    }
  };

  // Locations from server meta for stable dropdown
  const locations = useMemo(() => availableLocations, [availableLocations]);

  // Server returns already filtered/sorted/paginated list
  const filteredSortedJobs = useMemo(() => jobs, [jobs]);
  const totalPages = useMemo(() => serverTotalPages, [serverTotalPages]);

  const jobCards = useMemo(() => {
    return jobs.map((job, index) => (
      <motion.div
        key={(job._id || index) + (job.jobTitle || "")}
        className="group bg-white/80 backdrop-blur-sm border border-gray-100 hover:border-gray-200 p-6 rounded-3xl flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-primaryRed/10 hover:-translate-y-2"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
      >
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-bold text-xl text-gray-900 group-hover:text-primaryRed transition-colors duration-300">
                {job.jobTitle}
              </h4>
              <div className="flex items-center gap-2 text-gray-600 mt-2">
                <div className="w-2 h-2 rounded-full bg-primaryRed/60"></div>
                <Building2 size={14} className="text-gray-400" />
                <span className="text-sm font-medium">
                  {job.jobLocation || job.location || "Gurgaon, Haryana"}
                </span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primaryRed/10 to-red-100 flex items-center justify-center">
              <Briefcase size={20} className="text-primaryRed" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50/80 rounded-2xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <Users size={14} className="text-gray-400" />
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Experience</span>
              </div>
              <p className="text-sm font-semibold text-gray-800">
                {job.experience || "Not specified"}
              </p>
            </div>
            
            <div className="bg-gray-50/80 rounded-2xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <Clock size={14} className="text-gray-400" />
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Posted</span>
              </div>
              <p className="text-sm font-semibold text-gray-800">
                {calculateDaysAgo(job.createdAt || new Date().toISOString())}
              </p>
            </div>
          </div>

          {job.skill && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                <span className="text-xs font-medium text-blue-700 uppercase tracking-wide">Skills Required</span>
              </div>
              <p className="text-sm text-blue-800 font-medium">{job.skill}</p>
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 space-y-3">
          <motion.button
            onClick={() => setSelectedJob(job)}
            className="w-full px-6 py-3 bg-white border-2 border-primaryRed text-primaryRed font-semibold rounded-2xl hover:bg-primaryRed hover:text-white flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Eye size={18} />
            View Details
          </motion.button>
          <motion.button
            onClick={() => {
              if (job.status === "closed") {
                setClosedJobInfo({
                  title: job?.jobTitle || "This position",
                  email: "support@100acress.com",
                  phone: "+91 8500-900-100",
                });
                setFormError("");
                setApplyForId(job._id);
                return;
              }
              setClosedJobInfo(null);
              setApplyForId(job._id);
            }}
            className={`w-full px-6 py-3 text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg ${
              job.status === "closed"
                ? "bg-gray-400 hover:bg-gray-500 shadow-none"
                : "bg-gradient-to-r from-primaryRed to-red-600 hover:from-red-600 hover:to-red-700 shadow-primaryRed/25 hover:shadow-xl hover:shadow-primaryRed/40"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {job.status === "closed" ? "Closed" : "Apply Now"}
          </motion.button>
        </div>
      </motion.div>
    ));
  }, [jobs]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16 mt-16 lg:mt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primaryRed via-red-600 to-red-700 text-white mb-20">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative grid lg:grid-cols-2 gap-12 items-center p-8 lg:p-16">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-sm font-medium">We're Hiring!</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Shape Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-orange-200">
                  Future With Us
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-red-100 leading-relaxed max-w-2xl">
                Join a team that values growth, innovation, and impact. Discover opportunities to build a fulfilling career with us and drive your professional journey forward.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a 
                  href="#openings"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-primaryRed font-semibold rounded-2xl hover:bg-gray-100 transition-all duration-300 shadow-xl"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Open Positions
                  <ChevronDown size={20} className="ml-2" />
                </motion.a>
                
                <Link to="/about-us/">
                  <motion.button
                    className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-2xl hover:bg-white/10 transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn About Us
                  </motion.button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-3xl blur-2xl transform rotate-6"></div>
                <CarrierIcon className="relative w-full max-w-md h-auto" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
       

        {/* Open Positions Section */}
        <section id="openings" className="space-y-8">
          <div className="text-center space-y-4">
            <motion.h2 
              className="text-3xl lg:text-4xl font-bold text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Current Open Positions
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Find your perfect role and join our growing team of innovators
            </motion.p>
          </div>

          {/* Results Summary */}
          {/* <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white/60 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                <span className="font-bold text-gray-900 text-lg">{total}</span> positions found
              </div>
              <div className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </div>
            </div> */}
            
            {/* {(locationFilter !== 'all' || experienceFilter !== 'all' || debouncedSearch) && (
              <div className="flex flex-wrap gap-2">
                {debouncedSearch && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-blue-100 text-blue-800 text-sm">
                    <Search size={14} />
                    {debouncedSearch}
                  </span>
                )}
                {locationFilter !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-green-100 text-green-800 text-sm">
                    <MapPin size={14} />
                    {locationFilter}
                  </span>
                )}
                {experienceFilter !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-purple-100 text-purple-800 text-sm">
                    <Users size={14} />
                    {experienceFilter} years
                  </span>
                )}
              </div>
            )}
          </div> */}

          {/* Quick Filters */}
          {/* <div className="flex flex-wrap gap-3">
          
            {['all', '0-1', '2-4', '5+'].map(exp => (
              <motion.button
                key={`exp-${exp}`}
                onClick={() => setExperienceFilter(exp)}
                className={`px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-300 ${
                  experienceFilter === exp 
                    ? 'bg-gradient-to-r from-primaryRed to-red-600 text-white shadow-lg' 
                    : 'bg-white/70 text-gray-700 border border-gray-200 hover:bg-white hover:shadow-md'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {exp === 'all' ? 'Any Experience' : `${exp} years`}
              </motion.button>
            ))}
            
            
            {locations.filter(l => l !== 'all').slice(0, 4).map(loc => (
              <motion.button
                key={`loc-${loc}`}
                onClick={() => setLocationFilter(loc)}
                className={`px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-300 ${
                  locationFilter === loc 
                    ? 'bg-gradient-to-r from-primaryRed to-red-600 text-white shadow-lg' 
                    : 'bg-white/70 text-gray-700 border border-gray-200 hover:bg-white hover:shadow-md'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {loc}
              </motion.button>
            ))}
          </div> */}

       
          {/* <div className="lg:hidden">
            <motion.button
              onClick={() => setShowFilters(true)}
              className="inline-flex items-center gap-3 px-6 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl text-gray-700 font-medium hover:bg-white hover:shadow-md transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Filter size={20} />
              Advanced Filters
            </motion.button>
          </div> */}

     
          {/* <div className="hidden lg:block sticky top-4 z-30"> */}
            {/* <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl p-6 shadow-lg"> */}
              {/* <div className="grid grid-cols-12 gap-4 items-center"> */}
          
                {/* <div className="col-span-4">
                  <div className="relative">
                    <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primaryRed focus:border-transparent transition-all duration-300"
                      placeholder="Search positions, skills, locations..."
                    />
                  </div>
                </div> */}

{/*              
                <div className="col-span-3">
                  <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primaryRed focus:border-transparent transition-all duration-300"
                  >
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc === 'all' ? 'All Locations' : loc}
                      </option>
                    ))}
                  </select>
                </div> */}

{/*                
                <div className="col-span-2">
                  <select
                    value={experienceFilter}
                    onChange={(e) => setExperienceFilter(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primaryRed focus:border-transparent transition-all duration-300"
                  >
                    <option value="all">Any Experience</option>
                    <option value="0-1">0-1 years</option>
                    <option value="2-4">2-4 years</option>
                    <option value="5+">5+ years</option>
                  </select>
                </div> */}

                {/* Sort */}
                {/* <div className="col-span-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primaryRed focus:border-transparent transition-all duration-300"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                </div> */}

                {/* Clear */}
                {/* <div className="col-span-1">
                  <motion.button
                    onClick={() => {
                      setSearch('');
                      setLocationFilter('all');
                      setExperienceFilter('all');
                      setSortBy('newest');
                      setCurrentPage(1);
                    }}
                    className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-2xl transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Clear
                  </motion.button>
                </div> */}
              {/* </div> */}
            {/* </div> */}
          {/* </div> */}

          {/* Mobile Filter Modal */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                className="fixed inset-0 z-50 lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
                <div className="absolute bottom-0 left-0 right-0">
                  <motion.div
                    className="bg-white rounded-t-3xl p-6 shadow-2xl max-h-[80vh] overflow-y-auto"
                    initial={{ y: 400 }}
                    animate={{ y: 0 }}
                    exit={{ y: 400 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-900">Filter Positions</h3>
                      <button
                        onClick={() => setShowFilters(false)}
                        className="p-2 rounded-2xl bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <div className="space-y-6">
                      {/* Search */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                        <div className="relative">
                          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primaryRed focus:border-transparent transition-all duration-300"
                            placeholder="Search positions, skills, locations..."
                          />
                        </div>
                      </div>

                      {/* Location */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                        <select
                          value={locationFilter}
                          onChange={(e) => setLocationFilter(e.target.value)}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primaryRed focus:border-transparent transition-all duration-300"
                        >
                          {locations.map((loc) => (
                            <option key={loc} value={loc}>
                              {loc === 'all' ? 'All Locations' : loc}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Experience */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                        <select
                          value={experienceFilter}
                          onChange={(e) => setExperienceFilter(e.target.value)}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primaryRed focus:border-transparent transition-all duration-300"
                        >
                          <option value="all">Any Experience</option>
                          <option value="0-1">0-1 years</option>
                          <option value="2-4">2-4 years</option>
                          <option value="5+">5+ years</option>
                        </select>
                      </div>

                      {/* Sort */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primaryRed focus:border-transparent transition-all duration-300"
                        >
                          <option value="newest">Newest First</option>
                          <option value="oldest">Oldest First</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100">
                      <button
                        onClick={() => {
                          setSearch('');
                          setLocationFilter('all');
                          setExperienceFilter('all');
                        }}
                        className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-2xl hover:bg-gray-200 transition-colors"
                      >
                        Clear All
                      </button>
                      <button
                        onClick={() => setShowFilters(false)}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-primaryRed to-red-600 text-white font-semibold rounded-2xl shadow-lg"
                      >
                        Apply Filters
                      </button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 animate-pulse">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="h-6 bg-gray-200 rounded-2xl w-3/4 mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded-xl w-1/2"></div>
                    </div>
                    <div className="w-12 h-12 bg-gray-200 rounded-2xl"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="h-16 bg-gray-200 rounded-2xl"></div>
                    <div className="h-16 bg-gray-200 rounded-2xl"></div>
                  </div>
                  <div className="h-12 bg-gray-200 rounded-2xl"></div>
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <motion.div 
              className="bg-red-50 border border-red-200 rounded-3xl p-8 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <X size={32} className="text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-red-800 mb-2">Something went wrong</h3>
              <p className="text-red-600">{error}</p>
            </motion.div>
          )}

          {/* Empty State */}
          {!loading && total === 0 && !error && (
            <motion.div 
              className="bg-gray-50 border border-gray-200 rounded-3xl p-12 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
                <Search size={40} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">No positions found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters or check back later for new opportunities.</p>
              <button
                onClick={() => {
                  setSearch('');
                  setLocationFilter('all');
                  setExperienceFilter('all');
                }}
                className="inline-flex items-center px-6 py-3 bg-primaryRed text-white font-semibold rounded-2xl hover:bg-red-600 transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          )}

          {/* Job Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {jobCards}
          </div>

          {/* Pagination */}
          {total > pageSize && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Show</span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(parseInt(e.target.value, 10));
                    setCurrentPage(1);
                  }}
                  className="px-3 py-1.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primaryRed"
                >
                  {[9, 12, 24, 36].map(size => (
                    <option key={size} value={size}>{size} per page</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    currentPage === 1 
                      ? 'text-gray-400 bg-gray-100 cursor-not-allowed' 
                      : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:shadow-md'
                  }`}
                  whileHover={currentPage > 1 ? { scale: 1.05 } : {}}
                  whileTap={currentPage > 1 ? { scale: 0.95 } : {}}
                >
                  Previous
                </motion.button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage + 2))
                    .map(page => (
                      <motion.button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-xl font-medium transition-all duration-300 ${
                          currentPage === page
                            ? 'bg-gradient-to-r from-primaryRed to-red-600 text-white shadow-lg'
                            : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {page}
                      </motion.button>
                    ))}
                </div>

                <motion.button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    currentPage === totalPages 
                      ? 'text-gray-400 bg-gray-100 cursor-not-allowed' 
                      : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:shadow-md'
                  }`}
                  whileHover={currentPage < totalPages ? { scale: 1.05 } : {}}
                  whileTap={currentPage < totalPages ? { scale: 0.95 } : {}}
                >
                  Next
                </motion.button>
              </div>
            </div>
          )}
        </section>

        {/* Job Details Modal */}
        <AnimatePresence>
          {selectedJob && (
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[99999] p-2 sm:p-4 lg:p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-xl sm:rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl mx-2 sm:mx-3"
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-white/95 backdrop-blur-sm p-4 sm:p-6 border-b border-gray-100 rounded-t-2xl">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-4">
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{selectedJob.jobTitle}</h2>
                      <div className="flex items-center gap-3 text-gray-600">
                        <div className="flex items-center gap-2">
                          <Building2 size={16} className="text-gray-400" />
                          <span className="font-medium">{selectedJob.jobLocation || "Gurgaon, Haryana"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-gray-400" />
                          <span className="text-sm">{calculateDaysAgo(selectedJob.createdAt || new Date().toISOString())}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedJob(null)}
                      className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-all duration-200 flex-shrink-0"
                    >
                      <X size={24} />
                    </button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-4 sm:p-6 space-y-8">
                  {/* Job Profile */}
                  {selectedJob.jobProfile && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-xl bg-blue-500/20 flex items-center justify-center">
                          <Target size={18} className="text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-blue-900">Job Overview</h3>
                      </div>
                      <p className="text-blue-800 leading-relaxed">{selectedJob.jobProfile}</p>
                    </div>
                  )}

                  {/* Key Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Experience */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-xl bg-green-500/20 flex items-center justify-center">
                          <Users size={18} className="text-green-600" />
                        </div>
                        <h4 className="text-lg font-bold text-gray-900">Experience Required</h4>
                      </div>
                      <p className="text-gray-700 font-medium">{selectedJob.experience || "Not specified"}</p>
                    </div>

                    {/* Skills */}
                    {selectedJob.skill && (
                      <div className="bg-white border border-gray-200 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-8 rounded-xl bg-purple-500/20 flex items-center justify-center">
                            <Award size={18} className="text-purple-600" />
                          </div>
                          <h4 className="text-lg font-bold text-gray-900">Skills Required</h4>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{selectedJob.skill}</p>
                      </div>
                    )}
                  </div>

                  {/* Responsibilities */}
                  {selectedJob.responsibility && (
                    <div className="bg-white border border-gray-200 rounded-2xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-xl bg-orange-500/20 flex items-center justify-center">
                          <Briefcase size={18} className="text-orange-600" />
                        </div>
                        <h4 className="text-lg font-bold text-gray-900">Key Responsibilities</h4>
                      </div>
                      <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {selectedJob.responsibility}
                      </div>
                    </div>
                  )}

                  {/* Job Meta Information */}
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Job Information</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Job ID:</span>
                        <span className="font-medium text-gray-900">{selectedJob._id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Posted Date:</span>
                        <span className="font-medium text-gray-900">
                          {new Date(selectedJob.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Updated:</span>
                        <span className="font-medium text-gray-900">
                          {new Date(selectedJob.updatedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Location:</span>
                        <span className="font-medium text-gray-900">{selectedJob.jobLocation || "Gurgaon, Haryana"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm p-4 sm:p-6 border-t border-gray-100 rounded-b-2xl">
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <motion.button
                      onClick={() => setSelectedJob(null)}
                      className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Close
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        if (selectedJob?.status === "closed") {
                          setClosedJobInfo({
                            title: selectedJob?.jobTitle || "This position",
                            email: "support@100acress.com",
                            phone: "+91 8500-900-100",
                          });
                          setFormError(
                            "This position is currently closed. Please reach out to our support team for assistance."
                          );
                        } else {
                          setClosedJobInfo(null);
                          setFormError("");
                        }
                        setApplyForId(selectedJob._id);
                        setSelectedJob(null);
                      }}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-primaryRed to-red-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Apply for This Position
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Application Modal */}
        <AnimatePresence>
          {applyForId && (
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[99999] p-2 sm:p-4 lg:p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-xl sm:rounded-2xl w-full max-w-2xl max-h-[75vh] sm:max-h-[75vh] overflow-y-auto shadow-xl mx-2 sm:mx-3"
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
              >
                <div className="sticky top-0 bg-white/95 backdrop-blur-sm p-4 sm:p-5 border-b border-gray-100 rounded-t-2xl sm:rounded-t-3xl">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-4">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 text-center">Apply for Position</h3>
                      <p className="text-xs sm:text-sm text-gray-500 text-center">Submit your application and we'll get back to you soon</p>
                    </div>
                    <button
                      onClick={() => {
                        setApplyForId(null);
                        setClosedJobInfo(null);
                        setFormError("");
                      }}
                      className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-all duration-200 flex-shrink-0"
                    >
                      <X size={20} className="sm:hidden" />
                      <X size={24} className="hidden sm:block" />
                    </button>
                  </div>
                </div>

                <form onSubmit={submitApplication} className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                  {closedJobInfo && (
                    <motion.div
                      className="bg-amber-50 border border-amber-200 text-amber-900 p-4 sm:p-5 rounded-2xl"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="space-y-2">
                        <p className="text-sm sm:text-base font-semibold">
                          Job Closed: {closedJobInfo.title}
                        </p>
                        <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
                          This position is no longer accepting applications at the moment. For support, please email
                          {" "}
                          <a className="font-semibold underline" href={`mailto:${closedJobInfo.email}`}>
                            {closedJobInfo.email}
                          </a>
                          {" "}
                          or call
                          {" "}
                          <a className="font-semibold underline" href={`tel:${closedJobInfo.phone.replace(/[^\d+]/g, "")}`}>
                            {closedJobInfo.phone}
                          </a>
                          .
                        </p>
                      </div>
                    </motion.div>
                  )}
                  {formError && (
                    <motion.div 
                      className="bg-red-50 border border-red-200 text-red-700 p-4 sm:p-5 rounded-2xl"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <X size={12} className="text-red-600" />
                        </div>
                        <p className="text-sm sm:text-base font-medium leading-relaxed">{formError}</p>
                      </div>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                    <div className="space-y-2">
                      <label className="block text-sm sm:text-base font-semibold text-gray-700">Full Name *</label>
                      <input
                        className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-primaryRed focus:border-transparent transition-all duration-300"
                        placeholder="Enter your full name"
                        value={form.name}
                        onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm sm:text-base font-semibold text-gray-700">Email Address *</label>
                      <input
                        type="email"
                        className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-primaryRed focus:border-transparent transition-all duration-300"
                        placeholder="Enter your email address"
                        value={form.email}
                        onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm sm:text-base font-semibold text-gray-700">Phone Number</label>
                    <input
                      type="tel"
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-primaryRed focus:border-transparent transition-all duration-300"
                      placeholder="Enter your phone number (optional)"
                      value={form.phone}
                      onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm sm:text-base font-semibold text-gray-700">Resume URL</label>
                    <input
                      type="url"
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-primaryRed focus:border-transparent transition-all duration-300"
                      placeholder="Link to your resume (Google Drive, LinkedIn, etc.)"
                      value={form.resumeUrl}
                      onChange={(e) => setForm(f => ({ ...f, resumeUrl: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm sm:text-base font-semibold text-gray-700">Upload Resume</label>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                        className="sr-only"
                        id="resume-upload"
                      />
                      <label
                        htmlFor="resume-upload"
                        className="flex flex-col items-center justify-center w-full h-32 sm:h-40 lg:h-48 border-2 border-gray-200 border-dashed rounded-xl sm:rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-300 group"
                      >
                        <div className="flex flex-col items-center justify-center p-6">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 mb-4 bg-gradient-to-br from-primaryRed/10 to-red-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-primaryRed" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                            </svg>
                          </div>
                          <div className="text-center">
                            <p className="mb-2 text-sm sm:text-base text-gray-600">
                              {resumeFile ? (
                                <span className="font-semibold text-primaryRed break-all">{resumeFile.name}</span>
                              ) : (
                                <>
                                  <span className="font-semibold text-gray-700">Click to upload</span>
                                  <span className="text-gray-500"> or drag and drop</span>
                                </>
                              )}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-400 font-medium">PDF, DOC, DOCX (MAX. 5MB)</p>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm sm:text-base font-semibold text-gray-700">Cover Letter</label>
                    <textarea
                      className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryRed focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Tell us why you're interested in this position..."
                      rows={3}
                      value={form.coverLetter}
                      onChange={(e) => setForm(f => ({ ...f, coverLetter: e.target.value }))}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 lg:pt-8 border-t border-gray-100">
                    <motion.button
                      type="button"
                      onClick={() => {
                        setApplyForId(null);
                        setClosedJobInfo(null);
                        setFormError("");
                      }}
                      className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      disabled={submitting || (jobs.find((j) => j?._id === applyForId)?.status === "closed")}
                      className={`flex-1 px-6 py-3 text-sm sm:text-base font-semibold rounded-xl sm:rounded-2xl transition-all duration-300 ${
                        submitting || (jobs.find((j) => j?._id === applyForId)?.status === "closed")
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                          : 'bg-gradient-to-r from-primaryRed to-red-600 text-white shadow-lg hover:shadow-xl'
                      }`}
                      whileHover={!submitting ? { scale: 1.02 } : {}}
                      whileTap={!submitting ? { scale: 0.98 } : {}}
                    >
                      {submitting ? (
                        <div className="flex items-center justify-center gap-3">
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                          <span>Submitting...</span>
                        </div>
                      ) : (jobs.find((j) => j?._id === applyForId)?.status === "closed") ? (
                        'Job Closed'
                      ) : (
                        'Submit Application'
                      )}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact Section */}
        <section className="mt-24">
          <motion.div
            className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 lg:p-16 text-white relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primaryRed/10 to-red-600/10"></div>
            <div className="relative text-center space-y-6">
              <h3 className="text-3xl lg:text-4xl font-bold">
                Can't Find Your Perfect Role?
              </h3>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Don't see a position that matches your skills? We're always interested in connecting with passionate and talented individuals. Reach out to us directly!
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6 lg:gap-12 mt-12">
                <motion.a
                  href="mailto:hr@100acress.com"
                  className="flex items-center justify-center gap-4 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white hover:bg-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primaryRed/20 flex items-center justify-center">
                    <Mail size={24} className="text-primaryRed" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">Email Us</p>
                    <p className="text-sm text-gray-300">hr@100acress.com</p>
                  </div>
                </motion.a>

                <motion.a
                  href="tel:+918500900100"
                  className="flex items-center justify-center gap-4 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white hover:bg-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                    <Phone size={24} className="text-green-400" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">Call Us</p>
                    <p className="text-sm text-gray-300">+91-8500 900 100</p>
                  </div>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default CareerWithUs;