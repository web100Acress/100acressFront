import { motion } from "framer-motion";
import { 
  Dumbbell, Waves, Car, Shield, Wifi, Wind, 
  Trees, Users, ShoppingBag, Utensils, Baby, Heart,
  Gamepad2, BookOpen, Sparkles, Home
} from "lucide-react";

const DubaiProjectAmenities = ({ project }) => {
  // Icon mapping for amenities
  const iconMap = {
    gym: Dumbbell,
    fitness: Dumbbell,
    pool: Waves,
    swimming: Waves,
    parking: Car,
    security: Shield,
    wifi: Wifi,
    internet: Wifi,
    ac: Wind,
    garden: Trees,
    park: Trees,
    clubhouse: Users,
    club: Users,
    shopping: ShoppingBag,
    restaurant: Utensils,
    kids: Baby,
    children: Baby,
    spa: Heart,
    wellness: Heart,
    games: Gamepad2,
    gaming: Gamepad2,
    library: BookOpen,
    concierge: Sparkles,
    default: Home
  };

  const getIcon = (amenityName) => {
    const name = amenityName.toLowerCase();
    for (const [key, Icon] of Object.entries(iconMap)) {
      if (name.includes(key)) return Icon;
    }
    return iconMap.default;
  };

  // Extract amenities from project
  const projectAmenities = project?.amenities || project?.facilities || [];

  // Default amenities if none provided
  const defaultAmenities = [
    { name: "State-of-the-art Gymnasium", category: "Fitness" },
    { name: "Infinity Swimming Pool", category: "Recreation" },
    { name: "Multi-level Parking", category: "Convenience" },
    { name: "24/7 Security", category: "Safety" },
    { name: "High-speed WiFi", category: "Connectivity" },
    { name: "Central Air Conditioning", category: "Comfort" },
    { name: "Landscaped Gardens", category: "Outdoor" },
    { name: "Clubhouse", category: "Social" },
    { name: "Children's Play Area", category: "Family" },
    { name: "Spa & Wellness Center", category: "Wellness" },
    { name: "Retail Outlets", category: "Shopping" },
    { name: "Concierge Services", category: "Services" }
  ];

  const amenities = projectAmenities.length > 0 ? projectAmenities : defaultAmenities;

  // Group amenities by category
  const groupedAmenities = amenities.reduce((acc, amenity) => {
    const category = amenity.category || "General";
    if (!acc[category]) acc[category] = [];
    acc[category].push(amenity);
    return acc;
  }, {});

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold rounded-full blur-3xl" />
      </div>

      <div className="container relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase mb-4 block">
            World-Class Facilities
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Premium Amenities
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold to-gold/50 mx-auto mb-6" />
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Experience luxury living with state-of-the-art amenities designed for your comfort and convenience
          </p>
        </motion.div>

        {/* Amenities by Category */}
        <div className="space-y-16">
          {Object.entries(groupedAmenities).map(([category, items], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="w-2 h-8 bg-gold rounded-full" />
                {category}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((amenity, index) => {
                  const Icon = getIcon(amenity.name || amenity);
                  const amenityName = typeof amenity === 'string' ? amenity : amenity.name;
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="group"
                    >
                      <div className="flex items-center gap-4 p-6 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl hover:border-gold/50 hover:bg-white/10 transition-all duration-300">
                        <div className="flex-shrink-0 w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center group-hover:bg-gold/20 group-hover:scale-110 transition-all duration-300">
                          <Icon className="w-6 h-6 text-gold" />
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-medium leading-tight">{amenityName}</p>
                          {amenity.description && (
                            <p className="text-white/60 text-sm mt-1">{amenity.description}</p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="inline-block p-8 bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/30 rounded-2xl">
            <Sparkles className="w-12 h-12 text-gold mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">
              Luxury Redefined
            </h3>
            <p className="text-white/70 max-w-md">
              Every amenity is crafted to enhance your lifestyle and provide unmatched comfort
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DubaiProjectAmenities;
