import React, { useEffect, useMemo, useState } from "react";
import Footer from "../Components/Actual_Components/Footer";
import { MapPin, Mail, Phone, X, Search, SlidersHorizontal } from "lucide-react";
import { CarrierIcon } from "../Assets/icons";
import api from "../config/apiClient";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const CareerWithUs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [applyForId, setApplyForId] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", resumeUrl: "", coverLetter: "" });
  const [resumeFile, setResumeFile] = useState(null);
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
      setForm({ name: "", email: "", phone: "", resumeUrl: "", coverLetter: "" });
      setResumeFile(null);
    } catch (err) {
      console.error(err);
      setFormError(err?.response?.data?.message || "Failed to submit application. Please try again.");
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
        className="bg-white p-6 shadow-xl rounded-2xl flex flex-col justify-between transform transition-transform duration-300 hover:scale-105"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <div>
          <h4 className="font-bold text-lg text-gray-800">{job.jobTitle}</h4>
          <p className="flex items-center text-gray-600 mt-2">
            <MapPin color="#C13B44" size={16} className="mr-2" />
            {job.jobLocation || job.location || "Gurgaon, Haryana"}
          </p>
          <p className="mt-2 text-gray-600">
            Experience: <span className="font-semibold">{job.experience || "N/A"}</span>
          </p>
          {job.skill && (
            <p className="text-gray-600">
              Skills: <span className="font-semibold">{job.skill}</span>
            </p>
          )}
        </div>
        <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <p className="text-sm font-light text-gray-500 mb-2 sm:mb-0">
            Posted {calculateDaysAgo(job.createdAt || new Date().toISOString())}
          </p>
          <button
            onClick={() => setApplyForId(job._id)}
            className="px-6 py-2 bg-primaryRed hover:bg-red-700 text-white font-medium rounded-lg transition duration-300 transform hover:scale-105 shadow-md"
          >
            Apply Now
          </button>
        </div>
      </motion.div>
    ));
  }, [jobs]);

  return (
    <div className="overflow-x-hidden bg-gray-50">
      <div className="w-full px-4 md:px-8 py-8 md:py-16">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div
            className="lg:basis-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-primaryRed my-4" style={{ fontFamily: "'Gluten', serif" }}>
              Shape Your Future With Us
            </h1>
            <p className="text-lg md:text-xl text-gray-700 my-6">
              Join a team that values growth, innovation, and impact. Discover opportunities to build a fulfilling career with us and drive your professional journey forward.
            </p>
            <a href="#openings">
              <motion.button
                className="px-8 py-3 bg-primaryRed hover:bg-red-700 text-white font-semibold rounded-full transition duration-300 shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 8px 15px rgba(193, 59, 68, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                View Openings
              </motion.button>
            </a>
          </motion.div>
          <motion.div
            className="lg:basis-1/2 flex justify-center mt-8 lg:mt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <CarrierIcon className="w-full max-w-sm" />
          </motion.div>
        </div>

        {/* Commitment Section */}
        <section className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Our Commitment</h2>
          <p className="text-md text-gray-600 max-w-3xl mx-auto mt-4">
            We are committed to providing exceptional service and user-friendly tools to help our customers achieve their goals. We are always looking for ambitious, hard-working, and talented individuals who are passionate about making a difference. If you have the drive to achieve great milestones in your career, join our team!
          </p>
        </section>

        {/* Open Positions Section */}
        <section id="openings" className="mt-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Current Open Positions</h2>

          {/* Results summary */}
          <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
            <div>
              <span className="font-medium text-gray-800">{total}</span> jobs found
              <span className="ml-2 text-gray-500">(Page {currentPage} of {totalPages})</span>
            </div>
            {(locationFilter !== 'all' || experienceFilter !== 'all' || debouncedSearch) && (
              <div className="hidden md:flex items-center gap-2">
                {debouncedSearch && (
                  <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">Search: {debouncedSearch}</span>
                )}
                {locationFilter !== 'all' && (
                  <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">Location: {locationFilter}</span>
                )}
                {experienceFilter !== 'all' && (
                  <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">Experience: {experienceFilter}</span>
                )}
              </div>
            )}
          </div>

          {/* Quick filter chips */}
          <div className="flex flex-wrap gap-2 mb-4">
            {/* Experience chips */}
            {['all','0-1','2-4','5+'].map(exp => (
              <button
                key={`exp-${exp}`}
                onClick={() => setExperienceFilter(exp)}
                className={`px-3 py-1.5 rounded-full text-sm border transition ${experienceFilter === exp ? 'bg-primaryRed text-white border-primaryRed' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
              >
                {exp === 'all' ? 'Any experience' : `${exp} yrs`}
              </button>
            ))}
            {/* Location chips: top 5 (excluding 'all') */}
            {locations.filter(l => l !== 'all').slice(0,5).map(loc => (
              <button
                key={`loc-${loc}`}
                onClick={() => setLocationFilter(loc)}
                className={`px-3 py-1.5 rounded-full text-sm border transition ${locationFilter === loc ? 'bg-primaryRed text-white border-primaryRed' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
              >
                {loc}
              </button>
            ))}
          </div>

          {/* Mobile Filters Toggle */}
          <div className="md:hidden mb-3 flex justify-end">
            <button
              type="button"
              onClick={() => setShowFilters(true)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white shadow-sm"
            >
              <SlidersHorizontal size={18} /> Filters
            </button>
          </div>

          {/* Professional Filters Bar (Desktop) */}
          <div className="sticky top-0 z-30 mb-6 hidden md:block">
            <div className="bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 rounded-xl shadow border border-gray-200 p-3">
              <div className="grid grid-cols-12 gap-3 items-center">
                {/* Search */}
                <label className="col-span-4 relative block">
                  <span className="sr-only">Search jobs</span>
                  <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                    <Search size={16} />
                  </span>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg pl-9 pr-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primaryRed"
                    placeholder="Search by title, skill, or location"
                  />
                </label>

                {/* Location */}
                <label className="col-span-3">
                  <span className="sr-only">Location</span>
                  <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryRed"
                  >
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>{loc === 'all' ? 'All locations' : loc}</option>
                    ))}
                  </select>
                </label>

                {/* Experience */}
                <label className="col-span-2">
                  <span className="sr-only">Experience</span>
                  <select
                    value={experienceFilter}
                    onChange={(e) => setExperienceFilter(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryRed"
                  >
                    <option value="all">Any experience</option>
                    <option value="0-1">0-1 yrs</option>
                    <option value="2-4">2-4 yrs</option>
                    <option value="5+">5+ yrs</option>
                  </select>
                </label>

                {/* Sort */}
                <label className="col-span-1">
                  <span className="sr-only">Sort by</span>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                      <SlidersHorizontal size={18} />
                    </div>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg pl-10 pr-2 py-2 focus:outline-none focus:ring-2 focus:ring-primaryRed"
                    >
                      <option value="newest">Newest</option>
                      <option value="oldest">Oldest</option>
                    </select>
                  </div>
                </label>

                {/* Page Size */}
                <label className="col-span-1">
                  <span className="sr-only">Page size</span>
                  <select
                    value={pageSize}
                    onChange={(e) => { setPageSize(parseInt(e.target.value, 10)); setCurrentPage(1); }}
                    className="w-full border border-gray-300 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-primaryRed"
                  >
                    {[9, 12, 24, 36].map(sz => (
                      <option key={sz} value={sz}>{sz}/page</option>
                    ))}
                  </select>
                </label>

                {/* Clear */}
                <div className="col-span-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setSearch('');
                      setLocationFilter('all');
                      setExperienceFilter('all');
                      setSortBy('newest');
                      setPageSize(9);
                      setCurrentPage(1);
                    }}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition w-full md:w-auto"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Filters Drawer */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                className="fixed inset-0 z-40 flex items-end md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="absolute inset-0 bg-black/40" onClick={() => setShowFilters(false)} />
                <motion.div
                  className="relative w-full bg-white rounded-t-2xl p-4 shadow-xl"
                  initial={{ y: 400 }}
                  animate={{ y: 0 }}
                  exit={{ y: 400 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 25 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
                    <button onClick={() => setShowFilters(false)} className="text-gray-500 hover:text-gray-700">
                      <X size={22} />
                    </button>
                  </div>

                  {/* Search */}
                  <label className="relative block mb-3">
                    <span className="sr-only">Search jobs</span>
                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                      <Search size={18} />
                    </span>
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryRed"
                      placeholder="Search by title, skill, or location"
                    />
                  </label>

                  {/* Location */}
                  <label className="block mb-3">
                    <span className="sr-only">Location</span>
                    <select
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryRed"
                    >
                      {locations.map((loc) => (
                        <option key={loc} value={loc}>{loc === 'all' ? 'All locations' : loc}</option>
                      ))}
                    </select>
                  </label>

                  {/* Experience */}
                  <label className="block mb-3">
                    <span className="sr-only">Experience</span>
                    <select
                      value={experienceFilter}
                      onChange={(e) => setExperienceFilter(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryRed"
                    >
                      <option value="all">Any experience</option>
                      <option value="0-1">0-1 yrs</option>
                      <option value="2-4">2-4 yrs</option>
                      <option value="5+">5+ yrs</option>
                    </select>
                  </label>

                  {/* Sort */}
                  <label className="block mb-4">
                    <span className="sr-only">Sort by</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primaryRed"
                    >
                      <option value="newest">Newest</option>
                      <option value="oldest">Oldest</option>
                    </select>
                  </label>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSearch('');
                        setLocationFilter('all');
                        setExperienceFilter('all');
                        setSortBy('newest');
                      }}
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-700"
                    >
                      Clear
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowFilters(false)}
                      className="flex-1 px-4 py-2 rounded-lg bg-primaryRed text-white"
                    >
                      Apply
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow animate-pulse">
                  <div className="h-5 bg-gray-200 rounded w-2/3 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-6"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          )}
          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center">{error}</div>
          )}
          {!loading && total === 0 && !error && (
            <div className="text-center py-10 text-gray-500 text-lg">
              No positions are currently open. Please check back later.
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobCards}
          </div>

          {/* Pagination controls */}
          {total > pageSize && (
            <div className="mt-6 flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded border ${currentPage === 1 ? 'text-gray-400 border-gray-200 cursor-not-allowed' : 'text-gray-700 border-gray-300 hover:bg-gray-50'}`}
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).slice(Math.max(0, currentPage - 3), Math.max(0, currentPage - 3) + 5).map(pg => (
                <button
                  key={pg}
                  onClick={() => setCurrentPage(pg)}
                  className={`px-3 py-2 rounded border ${currentPage === pg ? 'bg-primaryRed text-white border-primaryRed' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                >
                  {pg}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded border ${currentPage === totalPages ? 'text-gray-400 border-gray-200 cursor-not-allowed' : 'text-gray-700 border-gray-300 hover:bg-gray-50'}`}
              >
                Next
              </button>
            </div>
          )}
        </section>

        {/* Application Modal */}
        <AnimatePresence>
          {applyForId && (
            <motion.div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white p-6 md:p-8 rounded-2xl w-full max-w-lg shadow-xl"
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                    Apply for this Job
                  </h3>
                  <button
                    onClick={() => setApplyForId(null)}
                    className="text-gray-400 hover:text-gray-600 transition"
                  >
                    <X size={24} />
                  </button>
                </div>
                <form onSubmit={submitApplication} className="space-y-4">
                  {formError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded">
                      {formError}
                    </div>
                  )}
                  <input
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryRed"
                    placeholder="Full name"
                    value={form.name}
                    onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                    required
                  />
                  <input
                    type="email"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryRed"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                    required
                  />
                  <input
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryRed"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))}
                  />
                  <input
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryRed"
                    placeholder="Resume URL (e.g., Google Drive link)"
                    value={form.resumeUrl}
                    onChange={(e) => setForm(f => ({ ...f, resumeUrl: e.target.value }))}
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Or upload resume (PDF/DOCX, optional)
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                      className="w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primaryRed file:text-white hover:file:bg-red-700"
                    />
                  </div>
                  <textarea
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryRed"
                    placeholder="Write your cover letter here..."
                    rows={4}
                    value={form.coverLetter}
                    onChange={(e) => setForm(f => ({ ...f, coverLetter: e.target.value }))}
                  />
                  <div className="flex gap-2 justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => setApplyForId(null)}
                      className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className={`px-6 py-2 rounded-lg text-white font-semibold transition duration-300 ${submitting ? 'bg-red-300 cursor-not-allowed' : 'bg-primaryRed hover:bg-red-700'}`}
                    >
                      {submitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact Information Section */}
        <section className="mt-20 text-center">
          <div className="bg-white p-6 md:p-8 shadow-lg rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
              Can't Find Your Role?
            </h3>
            <p className="text-gray-600 mb-6">
              If you don't see a suitable opening, feel free to reach out to us directly. We are always interested in connecting with passionate and talented individuals.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 md:gap-8">
              <a href="mailto:hr@100acress.com" className="flex items-center text-primaryRed font-medium hover:underline transition">
                <Mail color="#C13B44" size={20} strokeWidth={1.5} className="mr-2" />
                hr@100acress.com
              </a>
              <a href="tel:+918500900100" className="flex items-center text-primaryRed font-medium hover:underline transition">
                <Phone color="#C13B44" size={20} strokeWidth={1.5} className="mr-2" />
                +91-8500900100
              </a>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default CareerWithUs;