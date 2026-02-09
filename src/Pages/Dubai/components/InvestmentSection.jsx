import { TrendingUp, DollarSign, Award, Shield } from "lucide-react";
import { Button } from "../../../Components/ui/button";

export const InvestmentSection = () => {
  const insights = [
    {
      icon: TrendingUp,
      title: "High ROI",
      value: "15-20%",
      description: "Average annual return on investment",
    },
    {
      icon: DollarSign,
      title: "Rental Yield",
      value: "6-8%",
      description: "Competitive rental income potential",
    },
    {
      icon: Award,
      title: "Capital Growth",
      value: "12%",
      description: "Year-on-year property value increase",
    },
    {
      icon: Shield,
      title: "Tax Benefits",
      value: "0%",
      description: "No property tax or capital gains tax",
    },
  ];

  const hotspots = [
    { name: "Downtown Dubai", growth: "+18%", avgPrice: "2,500 AED/sqft" },
    { name: "Dubai Marina", growth: "+15%", avgPrice: "1,800 AED/sqft" },
    { name: "Palm Jumeirah", growth: "+22%", avgPrice: "3,200 AED/sqft" },
    { name: "Business Bay", growth: "+12%", avgPrice: "1,600 AED/sqft" },
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
            Best Investment Projects in Dubai
          </h2>
          <p className="text-sm sm:text-base lg:text-xl text-muted-foreground max-w-lg sm:max-w-2xl mx-auto">
            Discover high-growth projects in Dubai offering tax benefits and superior capital growth.
          </p>
        </div>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 lg:mb-16 px-4">
          {insights.map((insight, index) => {
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

        {/* Hotspots */}
        <div className="glass-effect rounded-2xl border border-white/10 p-8 md:p-12 animate-fade-in-scale">
          <div className="mb-8">
            <h3 className="text-3xl font-display font-bold text-white mb-2">
              Property Hotspots
            </h3>
            <p className="text-muted-foreground">
              Top performing areas with highest growth potential
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {hotspots.map((hotspot, index) => (
              <div
                key={hotspot.name}
                className="space-y-3 p-6 rounded-xl bg-black/30 border border-white/5 hover:border-gold/30 transition-all duration-300"
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                <h4 className="text-lg font-semibold text-white">
                  {hotspot.name}
                </h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Growth</span>
                  <span className="text-lg font-bold text-gold">
                    {hotspot.growth}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="text-sm text-muted-foreground">
                    Avg. Price
                  </span>
                  <span className="text-sm font-medium text-white">
                    {hotspot.avgPrice}
                  </span>
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
                Explore Premium Projects in Dubai
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-4xl mx-auto">
                The future of urban living with our curated selection of the best real estate projects in Dubai, designed to offer an unmatched blend of luxury and strategic growth. Whether you are looking for the latest off-plan developments in prime locations like Dubai Marina and Downtown or seeking affordable new housing projects in Dubai with high rental yields, we provide expert insights into the most promising opportunities. Our portfolio features the best projects, including exclusive waterfront villas, branded residences, and smart-home apartments that guarantee a 100% tax-free environment and long-term capital appreciation. Stay ahead of the market by exploring the latest luxury projects in Dubai that redefine world-class infrastructure and offer a secure gateway to high-ROI investments and 
                Golden Visa benefits
              </p>
            
              {/* <p className="text-muted-foreground text-base leading-relaxed max-w-3xl mx-auto">
                Find thoughtfully selected premium properties that match both your living goals and investment plans in Dubai. From residences to business spaces, every option is chosen for quality and growth potential.
              </p> */}
            </div> 
          </div>
          {/* jdbd*/}
        </div>
      </div>
    </section>
  );
};
