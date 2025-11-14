import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";

const DubaiProjectHighlights = ({ project }) => {
  // Extract highlights from project data
  const projectHighlights = project?.highlights || project?.keyHighlights || [];
  
  // Default highlights if none provided
  const defaultHighlights = [
    "Prime location in the heart of UAE",
    "World-class amenities and facilities",
    "Stunning architectural design",
    "High-quality construction materials",
    "Smart home technology integration",
    "24/7 security and concierge services",
    "Sustainable and eco-friendly features",
    "Excellent connectivity to major landmarks"
  ];

  const highlights = projectHighlights.length > 0 ? projectHighlights : defaultHighlights;

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-black to-black/95 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gold rounded-full blur-3xl" />
      </div>

      <div className="container relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="w-5 h-5 text-gold fill-gold" />
            <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
              Key Features
            </span>
            <Star className="w-5 h-5 text-gold fill-gold" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Project Highlights
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold to-gold/50 mx-auto" />
        </motion.div>

        {/* Highlights Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group"
            >
              <div className="flex items-start gap-4 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:border-gold/50 hover:bg-white/10 transition-all duration-300">
                <div className="flex-shrink-0 w-6 h-6 bg-gold/20 rounded-full flex items-center justify-center mt-1 group-hover:bg-gold/30 transition-colors">
                  <Check className="w-4 h-4 text-gold" />
                </div>
                <p className="text-white/90 leading-relaxed">
                  {typeof highlight === 'string' ? highlight : highlight.text || highlight.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Features Section */}
        {project?.specifications && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 max-w-4xl mx-auto"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
              Technical Specifications
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(project.specifications).map(([key, value], index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg"
                >
                  <span className="text-white/70 capitalize">{key.replace(/_/g, ' ')}</span>
                  <span className="text-white font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default DubaiProjectHighlights;
