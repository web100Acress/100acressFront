import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Maximize2, X } from "lucide-react";
import { Button } from "../../../../Components/ui/button";

const DubaiProjectFloorPlans = ({ project }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  
  // Extract floor plans from project
  const floorPlans = project?.floorPlans || project?.floor_plan || [];
  
  // Default floor plans if none provided
  const defaultPlans = [
    {
      type: "1 BHK",
      image: "/Images/logo.png",
      size: "650-750 Sq.Ft",
      description: "Compact and efficient layout"
    },
    {
      type: "2 BHK",
      image: "/Images/logo.png",
      size: "950-1100 Sq.Ft",
      description: "Spacious living with modern design"
    },
    {
      type: "3 BHK",
      image: "/Images/logo.png",
      size: "1400-1600 Sq.Ft",
      description: "Premium layout with luxury finishes"
    }
  ];

  const plans = floorPlans.length > 0 ? floorPlans : defaultPlans;

  if (plans.length === 0) return null;

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z' fill='%23d4af37' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }} />
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
            Unit Layouts
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Floor Plans
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold to-gold/50 mx-auto mb-6" />
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Explore our thoughtfully designed floor plans
          </p>
        </motion.div>

        {/* Floor Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-gold/50 transition-all duration-300">
                {/* Plan Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
                  <img
                    src={plan.image || plan.url || "/Images/logo.png"}
                    alt={`${plan.type || plan.bhk_type} Floor Plan`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <button
                      onClick={() => setSelectedPlan(plan)}
                      className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                    >
                      <Maximize2 className="w-6 h-6 text-white" />
                    </button>
                    <a
                      href={plan.image || plan.url}
                      download
                      className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                    >
                      <Download className="w-6 h-6 text-white" />
                    </a>
                  </div>
                </div>

                {/* Plan Details */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {plan.type || plan.bhk_type}
                  </h3>
                  <p className="text-gold font-semibold mb-3">
                    {plan.size || plan.area || "Contact for details"}
                  </p>
                  {plan.description && (
                    <p className="text-white/70 text-sm mb-4">
                      {plan.description}
                    </p>
                  )}
                  
                  <Button 
                    className="w-full gradient-gold text-black hover:shadow-gold"
                    onClick={() => setSelectedPlan(plan)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Download All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button 
            size="lg"
            variant="outline"
            className="border-gold text-gold hover:bg-gold hover:text-black px-8"
          >
            <Download className="w-5 h-5 mr-2" />
            Download All Floor Plans
          </Button>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      {selectedPlan && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedPlan(null)}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            onClick={() => setSelectedPlan(null)}
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Content */}
          <div className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden">
              <img
                src={selectedPlan.image || selectedPlan.url}
                alt={`${selectedPlan.type} Floor Plan`}
                className="w-full h-auto"
              />
              <div className="p-6 border-t border-white/10">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {selectedPlan.type || selectedPlan.bhk_type}
                </h3>
                <p className="text-gold font-semibold mb-4">
                  {selectedPlan.size || selectedPlan.area}
                </p>
                {selectedPlan.description && (
                  <p className="text-white/70 mb-4">{selectedPlan.description}</p>
                )}
                <a
                  href={selectedPlan.image || selectedPlan.url}
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-black rounded-lg hover:bg-gold/90 transition-colors font-semibold"
                >
                  <Download className="w-5 h-5" />
                  Download Floor Plan
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default DubaiProjectFloorPlans;
