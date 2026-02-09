import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Eye, Calendar, User, Tag, Share2, Bookmark } from 'lucide-react';

const BlogView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock blog data - in real app this would come from API
  const blogPosts = useMemo(() => [
    {
      id: 1,
      title: 'Delhi NCR Real Estate Outlook 2026: Where the Demand is Moving',
      excerpt: 'A data-backed view of micro-markets, buyer preferences, and the impact of new connectivity projects across Gurgaon, Noida, and Faridabad.',
      content: `
        <div class="prose prose-lg max-w-none">
          <p class="text-lg leading-relaxed text-gray-700 mb-6">
            The Delhi NCR real estate market is experiencing a fundamental shift in 2026, driven by infrastructure developments, changing buyer preferences, and strategic government initiatives. Our comprehensive analysis reveals significant opportunities across micro-markets that are poised for substantial growth.
          </p>
          
          <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Infrastructure: The Game Changer</h2>
          <p class="text-gray-700 mb-4">
            The expansion of metro connectivity, expressway networks, and smart city initiatives has created new corridors of opportunity. The Delhi-Mumbai Industrial Corridor (DMIC) and Delhi-NCR Region Plan 2041 are reshaping the real estate landscape.
          </p>
          
          <div class="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
            <p class="text-blue-800 font-semibold">Key Insight:</p>
            <p class="text-blue-700">Areas within 5km of new metro stations have seen 15-25% price appreciation over the past 18 months.</p>
          </div>
          
          <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Micro-Market Analysis</h2>
          <p class="text-gray-700 mb-4">
            Our data-driven approach identifies four primary micro-markets showing exceptional momentum:
          </p>
          
          <ul class="list-disc pl-6 text-gray-700 space-y-2 mb-6">
            <li><strong>New Gurgaon:</strong> Dwarka Expressway corridor showing 18% annual growth</li>
            <li><strong>Noida Sector 150:</strong> Expressway connectivity driving premium segment demand</li>
            <li><strong>South Delhi:</strong> Premium luxury segment with limited inventory</li>
            <li><strong>Faridabad Sector 21C:</strong> Metro connectivity creating new opportunities</li>
          </ul>
          
          <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Buyer Behavior Shifts</h2>
          <p class="text-gray-700 mb-4">
            Post-pandemic preferences have fundamentally altered buyer requirements. The demand for integrated communities, smart home features, and wellness amenities has increased by 40% across NCR.
          </p>
          
          <div class="grid md:grid-cols-2 gap-6 my-8">
            <div class="bg-emerald-50 p-4 rounded-lg">
              <h3 class="font-bold text-emerald-800 mb-2">Rising Segments</h3>
              <ul class="text-emerald-700 space-y-1">
                <li>• Integrated townships</li>
                <li>• Smart home communities</li>
                <li>• Transit-oriented developments</li>
              </ul>
            </div>
            <div class="bg-amber-50 p-4 rounded-lg">
              <h3 class="font-bold text-amber-800 mb-2">Stable Segments</h3>
              <ul class="text-amber-700 space-y-1">
                <li>• Established residential areas</li>
                <li>• End-user driven markets</li>
                <li>• Affordable housing segments</li>
              </ul>
            </div>
          </div>
          
          <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Investment Strategy 2026</h2>
          <p class="text-gray-700 mb-4">
            For investors looking to capitalize on NCR's growth trajectory, our analysis suggests focusing on:
          </p>
          
          <ol class="list-decimal pl-6 text-gray-700 space-y-2 mb-6">
            <li><strong>Transit-Oriented Developments:</strong> Areas within 2km of upcoming metro stations</li>
            <li><strong>Integrated Communities:</strong> Projects offering live-work-play environments</li>
            <li><strong>Premium Corridors:</strong> Established areas with limited new supply</li>
            <li><strong>Emerging Suburbs:</strong> Well-connected peripheral areas with growth potential</li>
          </ol>
          
          <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Market Outlook</h2>
          <p class="text-gray-700 mb-4">
            The next 24 months present unique opportunities for both end-users and investors. With infrastructure projects nearing completion and new connectivity corridors opening, early movers in identified micro-markets are positioned to benefit from significant appreciation.
          </p>
          
          <div class="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-lg my-8">
            <h3 class="font-bold text-red-800 mb-3">Bottom Line</h3>
            <p class="text-red-700">
              Delhi NCR's real estate market in 2026 is characterized by infrastructure-driven growth, changing buyer preferences, and strategic opportunities across micro-markets. Success requires understanding local dynamics, infrastructure impact, and timing market entry.
            </p>
          </div>
        </div>
      `,
      category: 'market',
      date: '2026-02-01',
      author: '100acress Insights',
      authorBio: 'Leading real estate research team with 15+ years of market analysis experience across NCR.',
      readTime: 6,
      views: 18450,
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&h=900&fit=crop',
      tags: ['delhi ncr', 'demand', 'outlook', 'infrastructure', 'investment'],
      publishedAt: '2026-02-01T10:00:00Z',
      updatedAt: '2026-02-01T10:00:00Z'
    },
    {
      id: 2,
      title: 'Sector-by-Sector Price Trend: Gurgaon (2024–2026)',
      excerpt: 'Understand what is driving price movement with a sector-wise breakdown, buyer segments, and inventory signals.',
      content: `
        <div class="prose prose-lg max-w-none">
          <p class="text-lg leading-relaxed text-gray-700 mb-6">
            Gurgaon's real estate market has shown remarkable resilience and growth over the past two years. Our comprehensive sector-by-sector analysis reveals distinct patterns that investors and end-users should understand for strategic decision-making.
          </p>
          
          <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Market Overview</h2>
          <p class="text-gray-700 mb-4">
            Gurgaon continues to be the preferred destination for corporate housing and premium residential developments. The city's strategic location, excellent connectivity, and infrastructure development have created a robust real estate ecosystem.
          </p>
          
          <div class="bg-emerald-50 border-l-4 border-emerald-400 p-4 my-6">
            <p class="text-emerald-800 font-semibold">Market Highlights:</p>
            <p class="text-emerald-700">Average price appreciation: 12% annually | Inventory absorption: 85% | New launches: 23 projects</p>
          </div>
          
          <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Sector Performance Analysis</h2>
          
          <div class="space-y-6">
            <div class="border-l-4 border-blue-400 pl-4">
              <h3 class="text-xl font-bold text-gray-900">Sector 45-48 (Premium Zone)</h3>
              <p class="text-gray-700 mb-2">Premium location with established infrastructure</p>
              <div class="grid md:grid-cols-3 gap-4 text-sm">
                <div class="bg-blue-50 p-3 rounded">
                  <p class="font-semibold text-blue-800">Price Range</p>
                  <p class="text-blue-700">₹8,500-12,000/sq.ft</p>
                </div>
                <div class="bg-blue-50 p-3 rounded">
                  <p class="font-semibold text-blue-800">Growth Rate</p>
                  <p class="text-blue-700">+15% annually</p>
                </div>
                <div class="bg-blue-50 p-3 rounded">
                  <p class="font-semibold text-blue-800">Buyer Segment</p>
                  <p class="text-blue-700">HNIs, Corporate</p>
                </div>
              </div>
            </div>
            
            <div class="border-l-4 border-emerald-400 pl-4">
              <h3 class="text-xl font-bold text-gray-900">Sector 65-67 (Emerging Zone)</h3>
              <p class="text-gray-700 mb-2">Growing corridor with new developments</p>
              <div class="grid md:grid-cols-3 gap-4 text-sm">
                <div class="bg-emerald-50 p-3 rounded">
                  <p class="font-semibold text-emerald-800">Price Range</p>
                  <p class="text-emerald-700">₹6,200-8,800/sq.ft</p>
                </div>
                <div class="bg-emerald-50 p-3 rounded">
                  <p class="font-semibold text-emerald-800">Growth Rate</p>
                  <p class="text-emerald-700">+18% annually</p>
                </div>
                <div class="bg-emerald-50 p-3 rounded">
                  <p class="font-semibold text-emerald-800">Buyer Segment</p>
                  <p class="text-emerald-700">Professionals, SMEs</p>
                </div>
              </div>
            </div>
            
            <div class="border-l-4 border-amber-400 pl-4">
              <h3 class="text-xl font-bold text-gray-900">New Gurgaon (Dwarka Expressway)</h3>
              <p class="text-gray-700 mb-2">High-growth corridor with infrastructure focus</p>
              <div class="grid md:grid-cols-3 gap-4 text-sm">
                <div class="bg-amber-50 p-3 rounded">
                  <p class="font-semibold text-amber-800">Price Range</p>
                  <p class="text-amber-700">₹4,800-7,200/sq.ft</p>
                </div>
                <div class="bg-amber-50 p-3 rounded">
                  <p class="font-semibold text-amber-800">Growth Rate</p>
                  <p class="text-amber-700">+22% annually</p>
                </div>
                <div class="bg-amber-50 p-3 rounded">
                  <p class="font-semibold text-amber-800">Buyer Segment</p>
                  <p class="text-amber-700">First-time buyers, Investors</p>
                </div>
              </div>
            </div>
          </div>
          
          <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Infrastructure Impact</h2>
          <p class="text-gray-700 mb-4">
            The Delhi-Mumbai Industrial Corridor (DMIC) and metro connectivity have been key drivers of price appreciation. Areas within 3km of metro stations have shown 20-25% higher price growth compared to distant locations.
          </p>
          
          <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Investment Recommendations</h2>
          <div class="grid md:grid-cols-2 gap-6 my-8">
            <div class="bg-green-50 p-4 rounded-lg">
              <h3 class="font-bold text-green-800 mb-2">Short-term (1-2 years)</h3>
              <ul class="text-green-700 space-y-1">
                <li>• New Gurgaon sectors</li>
                <li>• Metro-connected areas</li>
                <li>• Integrated townships</li>
              </ul>
            </div>
            <div class="bg-blue-50 p-4 rounded-lg">
              <h3 class="font-bold text-blue-800 mb-2">Long-term (3-5 years)</h3>
              <ul class="text-blue-700 space-y-1">
                <li>• Premium established sectors</li>
                <li>• Commercial hubs</li>
                <li>• Smart city developments</li>
              </ul>
            </div>
          </div>
          
          <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Market Outlook 2026</h2>
          <p class="text-gray-700 mb-4">
            Gurgaon's real estate market is positioned for continued growth, driven by corporate expansion, infrastructure development, and changing lifestyle preferences. The next 18 months present optimal entry opportunities in emerging corridors.
          </p>
          
          <div class="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg my-8">
            <h3 class="font-bold text-blue-800 mb-3">Investment Thesis</h3>
            <p class="text-blue-700">
              Gurgaon offers diversified opportunities across price segments and growth corridors. Success requires understanding sector dynamics, infrastructure impact, and timing market entry for maximum returns.
            </p>
          </div>
        </div>
      `,
      category: 'price-trends',
      date: '2026-01-18',
      author: 'Research Desk',
      authorBio: 'Market research specialists focusing on price trends and sector analysis across NCR.',
      readTime: 5,
      views: 12310,
      image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1600&h=900&fit=crop',
      tags: ['gurgaon', 'price', 'sector', 'investment', 'trends'],
      publishedAt: '2026-01-18T09:30:00Z',
      updatedAt: '2026-01-18T09:30:00Z'
    }
  ], []);

  const blogPost = blogPosts.find(post => post.id === parseInt(id));

  if (!blogPost) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-6">The article you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/insights/blog')}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    if (Number.isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blogPost.title,
        text: blogPost.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/insights/blog')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Blog</span>
            </button>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Article Header */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-800">
            {blogPost.category}
          </span>
        </div>
        
        <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-6">
          {blogPost.title}
        </h1>
        
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          {blogPost.excerpt}
        </p>
        
        {/* Article Meta */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span className="font-medium text-gray-900">{blogPost.author}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(blogPost.date)}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{blogPost.readTime} min read</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            <span>{blogPost.views.toLocaleString()} views</span>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="max-w-5xl mx-auto px-6 mb-8">
        <div className="relative h-96 rounded-2xl overflow-hidden">
          <img 
            src={blogPost.image} 
            alt={blogPost.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-6 pb-16">
        <div 
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:font-bold prose-h3:mt-6 prose-h3:mb-3 prose-ul:space-y-2 prose-li:text-gray-700 prose-strong:text-gray-900"
          dangerouslySetInnerHTML={{ __html: blogPost.content }}
        />
        
        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-500">Tags</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {blogPost.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
        
        {/* Author Bio */}
        <div className="mt-12 p-6 bg-gray-50 rounded-2xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">{blogPost.author}</h3>
              <p className="text-gray-600 mt-1">{blogPost.authorBio}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogView;
