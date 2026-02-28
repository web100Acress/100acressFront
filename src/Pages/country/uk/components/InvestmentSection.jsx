import { TrendingUp, DollarSign, Award, Shield } from "lucide-react";
import { Button } from "../../../../Components/ui/button";

export const InvestmentSection = () => {
  const insights = [
    {
      icon: TrendingUp,
      title: "Steady ROI",
      value: "8-12%",
      description: "Average annual return on investment",
    },
    {
      icon: DollarSign,
      title: "Rental Yield",
      value: "4-6%",
      description: "Competitive rental income potential",
    },
    {
      icon: Award,
      title: "Capital Growth",
      value: "5-8%",
      description: "Year-on-year property value increase",
    },
    {
      icon: Shield,
      title: "Stable Market",
      value: "Low",
      description: "Risk property market with strong regulations",
    },
  ];

  const hotspots = [
    { name: "Central London", growth: "+8%", avgPrice: "£1,200/sqft" },
    { name: "Manchester", growth: "+12%", avgPrice: "£280/sqft" },
    { name: "Birmingham", growth: "+10%", avgPrice: "£240/sqft" },
    { name: "Edinburgh", growth: "+9%", avgPrice: "£320/sqft" },
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
            Best Investment Projects in UK
          </h2>
          <p className="text-sm sm:text-base lg:text-xl text-muted-foreground max-w-lg sm:max-w-2xl mx-auto">
            Discover high-growth projects in UK offering stable returns and long-term capital appreciation.
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
                  "https://wa.me/919811750740?text=Hi! I'm interested in getting the full UK market report. Can you send it to me?",
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
            <h4 className="text-xl font-semibold text-white">Global Financial Hub</h4>
            <p className="text-sm text-muted-foreground">
              London remains a world-leading financial center
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
              Premium Education
            </h4>
            <p className="text-sm text-muted-foreground">
              World-renowned universities attract global students
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
              Strong Legal Framework
            </h4>
            <p className="text-sm text-muted-foreground">
              Transparent property laws protect investor rights
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
