import { Button } from "../../../Components/ui/button";
import { ArrowRight } from "lucide-react";
import lifestyle1 from "../assets/lifestyle-1.jpg";
import lifestyle2 from "../assets/lifestyle-2.jpg";

export const LifestyleSection = () => {
  return (
    <section id="lifestyle" className="py-24 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

      <div className="container relative">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
            The Dubai Experience
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white">
            Luxury Living
            <span className="block text-gold">Redefined</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience world-class amenities, stunning architecture, and an unparalleled lifestyle
          </p>
        </div>

        {/* Lifestyle Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Large Feature */}
          <div className="lg:row-span-2 relative group overflow-hidden rounded-2xl animate-fade-in-scale">
            <div className="relative h-[600px] lg:h-full">
              <img
                src={lifestyle1}
                alt="Dubai Luxury Lifestyle"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
                <h3 className="text-3xl md:text-4xl font-display font-bold text-white">
                  Iconic Skyline Views
                </h3>
                <p className="text-lg text-gray-300">
                  Wake up to breathtaking vistas of the world's most impressive skyline
                </p>
                <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-black group">
                  Explore Locations
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>

          {/* Small Features */}
          <div className="relative group overflow-hidden rounded-2xl animate-fade-in-scale" style={{ animationDelay: "0.1s" }}>
            <div className="relative h-[300px]">
              <img
                src={lifestyle2}
                alt="Dubai Business District"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
                <h3 className="text-2xl font-display font-bold text-white">
                  Business Hub
                </h3>
                <p className="text-sm text-gray-300">
                  Prime locations near major business districts
                </p>
              </div>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-2xl glass-effect border border-white/10 p-8 animate-fade-in-scale" style={{ animationDelay: "0.2s" }}>
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center">
                <span className="text-3xl">🏖️</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-white">
                World-Class Amenities
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mr-3" />
                  Private beach access
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mr-3" />
                  Infinity pools & spas
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mr-3" />
                  Fine dining restaurants
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold mr-3" />
                  Premium fitness centers
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16">
          {[
            { icon: "🌴", label: "Beachfront Living" },
            { icon: "🏙️", label: "Urban Excellence" },
            { icon: "✈️", label: "Airport Proximity" },
            { icon: "🛍️", label: "Luxury Shopping" },
          ].map((item, index) => (
            <div
              key={item.label}
              className="text-center p-6 glass-effect rounded-xl border border-white/10 hover:border-gold/50 transition-all duration-300 animate-fade-in-scale"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <p className="text-white font-medium">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
