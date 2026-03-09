import { TrendingUp, DollarSign, Award, Shield, Globe, CreditCard } from "lucide-react";
import { Button } from "../../../Components/ui/button";

export const InvestmentSection = () => {
  const insights = [
    {
      icon: TrendingUp,
      title: "High ROI",
      value: "15–20%",
      description: "Average annual return on investment, higher than most global real estate markets.",
    },
    {
      icon: DollarSign,
      title: "Rental Yield",
      value: "5–8%",
      description: "Competitive rental income potential, among the highest yields in the world.",
    },
    {
      icon: Award,
      title: "Capital Growth",
      value: "12%",
      description: "Year-on-year property value increase driven by consistent market demand.",
    },
    {
      icon: Shield,
      title: "Tax Benefits",
      value: "0%",
      description: "No annual property tax, no capital gains tax, and no tax on rental income.",
    },
    {
      icon: CreditCard,
      title: "Golden Visa",
      value: "10 Yr",
      description: "Qualify for UAE long-term residency by investing in Dubai real estate.",
    },
    {
      icon: Globe,
      title: "Infrastructure",
      value: "World-Class",
      description: "Iconic architecture, luxury lifestyle, and excellent global connectivity.",
    },
  ];

  const hotspots = [
    { 
      name: "Downtown Dubai", 
      description: "Home to iconic landmarks and luxury residential towers, Downtown Dubai is one of the most sought-after real estate destinations.",
      growth: "+18%", 
      avgPrice: "2,500 AED/sqft" 
    },
    { 
      name: "Dubai Marina", 
      description: "Dubai Marina offers waterfront apartments, luxury residences, and vibrant lifestyle options.",
      growth: "+15%", 
      avgPrice: "1,800 AED/sqft" 
    },
    { 
      name: "Palm Jumeirah", 
      description: "Palm Jumeirah is one of the most prestigious residential destinations featuring ultra-luxury villas, beachfront properties, and branded residences.",
      growth: "+22%", 
      avgPrice: "3,200 AED/sqft" 
    },
    { 
      name: "Business Bay", 
      description: "Business Bay is a fast-growing commercial and residential hub with modern apartments and office spaces.",
      growth: "+12%", 
      avgPrice: "1,600 AED/sqft" 
    },
  ];

  return (
    <section id="insights" className="py-24 relative overflow-hidden">
      {/* Blurry Video Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent">
        <div className="absolute inset-0 backdrop-blur-sm">
          <div className="h-full w-full bg-gradient-to-br from-gold/5 via-transparent to-gold/5 animate-pulse" />
        </div>
      </div>

      <div className="container relative">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 space-y-3 sm:space-y-4 px-4 animate-fade-in">
          <span className="text-gold text-xs sm:text-sm font-medium tracking-[0.2em] sm:tracking-[0.3em] uppercase">
            Market Intelligence
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-white leading-tight">
            Best Investment Properties in Dubai
          </h2>
          <p className="text-sm sm:text-base lg:text-xl text-muted-foreground max-w-lg sm:max-w-2xl mx-auto">
            Dubai has emerged as a global hotspot for real estate investment due to its strong economy and modern lifestyle. The city offers several advantages for property buyers and investors.
          </p>
        </div>

        {/* Insights Grid - 3 items per row, 2 rows */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-12 lg:mb-16 px-4">
          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {insights.slice(0, 3).map((insight, index) => {
              const Icon = insight.icon;
              return (
                <div
                  key={insight.title}
                  className="relative group glass-effect rounded-xl border border-white/10 hover:border-gold/50 transition-all duration-500 p-6 space-y-4 animate-fade-in-scale"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                    <Icon className="h-6 w-6 text-gold" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gold mb-1">
                      {insight.value}
                    </p>
                    <p className="text-lg font-semibold text-white mb-2">
                      {insight.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {insight.description}
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-gold opacity-0 group-hover:opacity-5 transition-opacity rounded-xl" />
                </div>
              );
            })}
          </div>
          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {insights.slice(3).map((insight, index) => {
              const Icon = insight.icon;
              return (
                <div
                  key={insight.title}
                  className="relative group glass-effect rounded-xl border border-white/10 hover:border-gold/50 transition-all duration-500 p-6 space-y-4 animate-fade-in-scale"
                  style={{ animationDelay: `${(index + 3) * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                    <Icon className="h-6 w-6 text-gold" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gold mb-1">
                      {insight.value}
                    </p>
                    <p className="text-lg font-semibold text-white mb-2">
                      {insight.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {insight.description}
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-gold opacity-0 group-hover:opacity-5 transition-opacity rounded-xl" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Hotspots */}
        <div className="glass-effect rounded-2xl border border-white/10 p-8 md:p-12 animate-fade-in-scale">
          <div className="mb-8">
            <h3 className="text-3xl font-display font-bold text-white mb-2">
              Popular Areas with Top Projects in Dubai
            </h3>
            <p className="text-muted-foreground">
              Several locations in Dubai are known for high-quality real estate developments and strong investment potential.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {hotspots.map((hotspot, index) => (
              <div
                key={hotspot.name}
                className="space-y-3 p-6 rounded-xl bg-black/30 border border-white/5 hover:border-gold/30 transition-all duration-300"
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-white">{hotspot.name}</h4>
                  <span className="text-gold font-bold">{hotspot.growth}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {hotspot.description}
                </p>
                <div className="pt-2 border-t border-white/10">
                  <p className="text-xs text-gold/80">Average Price</p>
                  <p className="text-sm font-semibold text-white">{hotspot.avgPrice}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="gradient-gold text-black hover:shadow-gold"
              onClick={() =>
                window.open(
                  "https://wa.me/919811750740?text=Hi! I'm interested in getting the full Dubai market report. Can you send it to me?",
                  "_blank",
                )
              }
            >
              Download Full Market Report
            </Button>
          </div>
        </div>

        {/* Why Invest */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div
            className="text-center space-y-3 animate-fade-in-scale"
            style={{ animationDelay: "0.8s" }}
          >
            <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto">
              <span className="text-3xl">🌍</span>
            </div>
            <h4 className="text-xl font-semibold text-white">Global Hub</h4>
            <p className="text-sm text-muted-foreground">
              Strategic location connecting East and West
            </p>
          </div>
          <div
            className="text-center space-y-3 animate-fade-in-scale"
            style={{ animationDelay: "0.9s" }}
          >
            <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto">
              <span className="text-3xl">🏆</span>
            </div>
            <h4 className="text-xl font-semibold text-white">
              World-Class Infrastructure
            </h4>
            <p className="text-sm text-muted-foreground">
              State-of-the-art facilities and transportation
            </p>
          </div>
          <div
            className="text-center space-y-3 animate-fade-in-scale"
            style={{ animationDelay: "1s" }}
          >
            <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto">
              <span className="text-3xl">💼</span>
            </div>
            <h4 className="text-xl font-semibold text-white">
              Business Friendly
            </h4>
            <p className="text-sm text-muted-foreground">
              100% foreign ownership and easy regulations
            </p>
          </div>
        </div>

        <div className="mt-16">
          {/* added new box for new content  */}
          <div className="glass-effect rounded-2xl border border-white/10 p-8 md:p-12 animate-fade-in-scale">
            <div className="mb-4 text-center">
              <h2 className="text-2xl font-semibold text-white mb-2">
                Future of Real Estate Projects in Dubai

              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-4xl mx-auto">
                Dubai continues to launch new residential and commercial developments as part of its long-term growth strategy. With population growth and increasing global investment, the demand for real estate is expected to rise in the coming years.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-4xl mx-auto mt-4">
                Major infrastructure projects, tourism growth, and business expansion are further strengthening Dubai's real estate sector. This makes projects in Dubai UAE a promising opportunity for both local and international investors.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-4xl mx-auto mt-4">
                Residential Projects in Dubai offer excellent opportunities for buyers and investors looking for luxury living and high returns. With world-class infrastructure, tax-free investment benefits, and strong market growth, Dubai has become one of the most attractive real estate destinations globally.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-4xl mx-auto mt-4">
                Whether you are looking for a luxury apartment, a waterfront villa, or a high-return investment property, the wide range of Dubai real estate projects ensures there is something for every buyer.
              </p>
            </div> 
          </div>
          {/* jdbd*/}
        </div>
      </div>
    </section>
  );
};
