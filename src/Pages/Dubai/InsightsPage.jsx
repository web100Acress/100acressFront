import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { BlogCard } from "./components/BlogCard";
import { Button } from "../../Components/ui/button";
import { Search, Filter, TrendingUp, BookOpen, Lightbulb, ChevronLeft, ChevronRight } from "lucide-react";
import { DubaiProvider } from "./context/DubaiContext";
import { ThemeProvider } from "./context/ThemeContext";
import axios from "axios";
import "./i18n/config";
import "./styles/theme.css";

const InsightsPageContent = () => {
  const { t } = useTranslation();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { value: "all", label: "All Insights" },
    { value: "Market Insights", label: "Market Insights" },
    { value: "Investment Guide", label: "Investment Guide" },
    { value: "Lifestyle", label: "Lifestyle" },
    { value: "Sustainability", label: "Sustainability" },
    { value: "Market Analysis", label: "Market Analysis" },
    { value: "Buyer's Guide", label: "Buyer's Guide" },
  ];

  useEffect(() => {
    fetchBlogs();
  }, [currentPage]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"}/api/blog/view`,
        {
          params: {
            page: currentPage,
            limit: 12,
            sortBy: "createdAt",
            sortOrder: "desc",
          },
        }
      );

      if (response.data.success !== false && response.data.data) {
        // Filter blogs by Dubai category
        const dubaiBlogs = response.data.data.filter(
          (blog) => blog.blog_Category?.toLowerCase().includes("dubai") ||
                    blog.blog_Title?.toLowerCase().includes("dubai") ||
                    blog.blog_Description?.toLowerCase().includes("dubai")
        );
        setBlogs(dubaiBlogs.length > 0 ? dubaiBlogs : response.data.data);
        setTotalPages(response.data.totalPages || 1);
      } else {
        setBlogs(getSampleBlogs());
        setTotalPages(1);
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError(err.message);
      setBlogs(getSampleBlogs());
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const getSampleBlogs = () => [
    {
      _id: "sample1",
      blog_Title: "Dubai Real Estate Market Trends 2024",
      blog_Description:
        "Discover the latest trends shaping Dubai's luxury real estate market. From waterfront developments to sustainable architecture, explore what's driving the market forward. The Dubai property market continues to show resilience with strong demand from international investors.",
      blog_Category: "Dubai Market Insights",
      author: "Real Estate Expert",
      createdAt: new Date().toISOString(),
      views: 1250,
      likes: 89,
      blog_Image: {
        url: "https://via.placeholder.com/800x600/1a1a1a/d4af37?text=Dubai+Market+Trends",
      },
      slug: "dubai-real-estate-trends-2024",
    },
    {
      _id: "sample2",
      blog_Title: "Investment Guide: Dubai Property Laws",
      blog_Description:
        "A comprehensive guide to understanding property ownership laws in Dubai and the UAE. Learn about freehold zones, visa benefits, and investment opportunities available to international buyers.",
      blog_Category: "Dubai Investment Guide",
      author: "Legal Advisor",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      views: 980,
      likes: 67,
      blog_Image: {
        url: "https://via.placeholder.com/800x600/1a1a1a/d4af37?text=Dubai+Property+Laws",
      },
      slug: "dubai-property-laws-guide",
    },
    {
      _id: "sample3",
      blog_Title: "Top 10 Luxury Communities in Dubai",
      blog_Description:
        "Explore Dubai's most prestigious residential communities. From Palm Jumeirah to Dubai Hills Estate, discover where luxury meets lifestyle in the city's most exclusive neighborhoods.",
      blog_Category: "Dubai Lifestyle",
      author: "Community Expert",
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      views: 1450,
      likes: 112,
      blog_Image: {
        url: "https://via.placeholder.com/800x600/1a1a1a/d4af37?text=Luxury+Communities",
      },
      slug: "top-luxury-communities-dubai",
    },
    {
      _id: "sample4",
      blog_Title: "Sustainable Living in Dubai",
      blog_Description:
        "How Dubai is leading the way in sustainable luxury living. Discover eco-friendly developments and green building initiatives that are shaping the future of real estate in the emirate.",
      blog_Category: "Dubai Sustainability",
      author: "Sustainability Expert",
      createdAt: new Date(Date.now() - 259200000).toISOString(),
      views: 756,
      likes: 54,
      blog_Image: {
        url: "https://via.placeholder.com/800x600/1a1a1a/d4af37?text=Sustainable+Living",
      },
      slug: "sustainable-living-dubai",
    },
    {
      _id: "sample5",
      blog_Title: "ROI Analysis: Dubai vs Global Markets",
      blog_Description:
        "Compare Dubai's real estate returns with other global markets. Data-driven insights for smart investment decisions in the UAE property market.",
      blog_Category: "Dubai Market Analysis",
      author: "Investment Analyst",
      createdAt: new Date(Date.now() - 345600000).toISOString(),
      views: 892,
      likes: 71,
      blog_Image: {
        url: "https://via.placeholder.com/800x600/1a1a1a/d4af37?text=ROI+Analysis",
      },
      slug: "dubai-roi-analysis",
    },
    {
      _id: "sample6",
      blog_Title: "Dubai Off-Plan Properties Guide",
      blog_Description:
        "Everything you need to know about purchasing off-plan properties in Dubai. Payment plans, risks, and rewards explained by industry experts.",
      blog_Category: "Dubai Buyer's Guide",
      author: "Property Consultant",
      createdAt: new Date(Date.now() - 432000000).toISOString(),
      views: 1120,
      likes: 95,
      blog_Image: {
        url: "https://via.placeholder.com/800x600/1a1a1a/d4af37?text=Off-Plan+Guide",
      },
      slug: "dubai-off-plan-properties-guide",
    },
    {
      _id: "sample7",
      blog_Title: "Dubai Marina: Investment Hotspot",
      blog_Description:
        "Why Dubai Marina remains one of the most sought-after locations for property investment. Explore the amenities, lifestyle, and investment potential of this waterfront community.",
      blog_Category: "Dubai Market Insights",
      author: "Location Expert",
      createdAt: new Date(Date.now() - 518400000).toISOString(),
      views: 1340,
      likes: 103,
      blog_Image: {
        url: "https://via.placeholder.com/800x600/1a1a1a/d4af37?text=Dubai+Marina",
      },
      slug: "dubai-marina-investment-hotspot",
    },
    {
      _id: "sample8",
      blog_Title: "Downtown Dubai Living Experience",
      blog_Description:
        "Experience the pinnacle of urban luxury in Downtown Dubai. From Burj Khalifa views to world-class dining and entertainment, discover what makes this area special.",
      blog_Category: "Dubai Lifestyle",
      author: "Lifestyle Curator",
      createdAt: new Date(Date.now() - 604800000).toISOString(),
      views: 1580,
      likes: 128,
      blog_Image: {
        url: "https://via.placeholder.com/800x600/1a1a1a/d4af37?text=Downtown+Dubai",
      },
      slug: "downtown-dubai-living-experience",
    },
  ];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      searchQuery === "" ||
      blog.blog_Title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.blog_Description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory =
      selectedCategory === "all" ||
      blog.blog_Category?.toLowerCase().includes(selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/10 via-transparent to-black" />
        <div className="absolute top-20 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
              {t("insights.subtitle") || "Dubai Market Intelligence"}
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white">
              Dubai Real Estate
              <span className="block text-gold">Insights & Trends</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Expert analysis, market trends, and investment insights for Dubai's luxury real estate market
            </p>
          </div>

          {/* Feature Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
            {[
              { icon: TrendingUp, label: "Market Analysis", count: "50+" },
              { icon: BookOpen, label: "Expert Guides", count: "30+" },
              { icon: Lightbulb, label: "Investment Tips", count: "40+" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="p-6 glass-effect rounded-xl border border-white/10 text-center animate-fade-in-scale"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <stat.icon className="h-10 w-10 text-gold mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{stat.count}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 border-y border-white/10">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search insights..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="h-5 w-5 text-gray-400" />
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category.value
                      ? "bg-gold text-black"
                      : "bg-white/5 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="py-16">
        <div className="container">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-gold border-r-transparent"></div>
              <p className="mt-4 text-gray-400">Loading Dubai insights...</p>
            </div>
          ) : error && filteredBlogs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-red-400">Failed to load insights. Please try again later.</p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No insights found matching your criteria.</p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="mt-4 gradient-gold text-black"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBlogs.map((blog, index) => (
                  <BlogCard key={blog._id} blog={blog} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-16">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="border-gold text-gold hover:bg-gold hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  
                  <div className="flex items-center gap-2">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-10 h-10 rounded-lg font-medium transition-all ${
                            currentPage === pageNum
                              ? "bg-gold text-black"
                              : "bg-white/5 text-gray-300 hover:bg-white/10"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="border-gold text-gold hover:bg-gold hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

const InsightsPage = () => {
  return (
    <ThemeProvider>
      <DubaiProvider>
        <InsightsPageContent />
      </DubaiProvider>
    </ThemeProvider>
  );
};

export default InsightsPage;
