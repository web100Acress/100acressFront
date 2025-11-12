import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../../Components/ui/button";
import { ArrowRight, TrendingUp, BookOpen, Lightbulb } from "lucide-react";
import { BlogCard } from "./BlogCard";
import axios from "axios";

export const InsightsSection = () => {
  const { t } = useTranslation();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"}/api/blog/view`,
        {
          params: {
            page: 1,
            limit: 6,
            sortBy: "createdAt",
            sortOrder: "desc",
          },
        }
      );

      if (response.data.success !== false && response.data.data) {
        setBlogs(response.data.data);
      } else {
        // Use sample data if no blogs found
        setBlogs(getSampleBlogs());
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError(err.message);
      // Use sample data on error
      setBlogs(getSampleBlogs());
    } finally {
      setLoading(false);
    }
  };

  const getSampleBlogs = () => [
    {
      _id: "sample1",
      blog_Title: "Dubai Real Estate Market Trends 2024",
      blog_Description:
        "Discover the latest trends shaping Dubai's luxury real estate market. From waterfront developments to sustainable architecture, explore what's driving the market forward.",
      blog_Category: "Market Insights",
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
      blog_Title: "Investment Guide: UAE Property Laws",
      blog_Description:
        "A comprehensive guide to understanding property ownership laws in the UAE. Learn about freehold zones, visa benefits, and investment opportunities.",
      blog_Category: "Investment Guide",
      author: "Legal Advisor",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      views: 980,
      likes: 67,
      blog_Image: {
        url: "https://via.placeholder.com/800x600/1a1a1a/d4af37?text=UAE+Property+Laws",
      },
      slug: "uae-property-laws-guide",
    },
    {
      _id: "sample3",
      blog_Title: "Top 10 Luxury Communities in Dubai",
      blog_Description:
        "Explore Dubai's most prestigious residential communities. From Palm Jumeirah to Dubai Hills Estate, discover where luxury meets lifestyle.",
      blog_Category: "Lifestyle",
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
        "How Dubai is leading the way in sustainable luxury living. Discover eco-friendly developments and green building initiatives.",
      blog_Category: "Sustainability",
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
        "Compare Dubai's real estate returns with other global markets. Data-driven insights for smart investment decisions.",
      blog_Category: "Market Analysis",
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
      blog_Title: "Buyer's Guide: Off-Plan Properties",
      blog_Description:
        "Everything you need to know about purchasing off-plan properties in Dubai. Payment plans, risks, and rewards explained.",
      blog_Category: "Buyer's Guide",
      author: "Property Consultant",
      createdAt: new Date(Date.now() - 432000000).toISOString(),
      views: 1120,
      likes: 95,
      blog_Image: {
        url: "https://via.placeholder.com/800x600/1a1a1a/d4af37?text=Off-Plan+Guide",
      },
      slug: "off-plan-properties-guide",
    },
  ];

  return (
    <section id="insights" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

      <div className="container relative">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
            {t("insights.subtitle") || "Market Intelligence"}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white">
            {t("insights.title") || "Insights &"}
            <span className="block text-gold">
              {t("insights.titleHighlight") || "Market Trends"}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("insights.description") ||
              "Stay informed with expert analysis, market trends, and investment insights"}
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: TrendingUp,
              title: "Market Analysis",
              description: "Real-time market trends and forecasts",
              color: "text-gold",
            },
            {
              icon: BookOpen,
              title: "Expert Guides",
              description: "Comprehensive buying and investment guides",
              color: "text-blue-400",
            },
            {
              icon: Lightbulb,
              title: "Investment Tips",
              description: "Strategic insights for smart investments",
              color: "text-purple-400",
            },
          ].map((feature, index) => (
            <div
              key={feature.title}
              className="p-6 glass-effect rounded-xl border border-white/10 hover:border-gold/50 transition-all duration-300 group animate-fade-in-scale"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <feature.icon
                className={`h-12 w-12 ${feature.color} mb-4 group-hover:scale-110 transition-transform`}
              />
              <h3 className="text-xl font-display font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-gold border-r-transparent"></div>
            <p className="mt-4 text-gray-400">Loading insights...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && blogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-red-400">Failed to load blogs. Please try again later.</p>
          </div>
        )}

        {/* Blog Grid */}
        {!loading && blogs.length > 0 && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {blogs.map((blog, index) => (
                <BlogCard
                  key={blog._id}
                  blog={blog}
                  featured={index === 0}
                />
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <Button
                size="lg"
                className="gradient-gold text-black hover:shadow-gold group"
                onClick={() => (window.location.href = "/blog")}
              >
                View All Insights
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
