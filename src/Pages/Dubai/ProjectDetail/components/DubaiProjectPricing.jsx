import { motion } from "framer-motion";
import { DollarSign, Home, Bed, Bath, Maximize, TrendingUp } from "lucide-react";
import { Button } from "../../../../Components/ui/button";

const DubaiProjectPricing = ({ project }) => {
  // Extract pricing information
  const configurations = project?.BhK_Details || project?.configurations || [];
  const paymentPlan = project?.paymentPlan || [];
  const minPrice = project?.minPrice;
  const maxPrice = project?.maxPrice;

  // Default configurations if none provided
  const defaultConfigs = [
    { type: "1 BHK", size: "650-750", price: "Contact for Price", beds: 1, baths: 1 },
    { type: "2 BHK", size: "950-1100", price: "Contact for Price", beds: 2, baths: 2 },
    { type: "3 BHK", size: "1400-1600", price: "Contact for Price", beds: 3, baths: 3 },
  ];

  const displayConfigs = configurations.length > 0 ? configurations : defaultConfigs;

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='1'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
            Pricing & Configurations
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Choose Your Perfect
            <span className="block text-gold">Home</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold to-gold/50 mx-auto mb-6" />
          
          {minPrice && maxPrice && (
            <p className="text-xl text-white/80">
              Starting from <span className="text-gold font-bold">AED {minPrice.toLocaleString()}</span>
              {maxPrice !== minPrice && ` to AED ${maxPrice.toLocaleString()}`}
            </p>
          )}
        </motion.div>

        {/* Configuration Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {displayConfigs.map((config, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-gold/50 transition-all duration-300 hover:shadow-2xl hover:shadow-gold/10">
                {/* Card Header */}
                <div className="bg-gradient-to-r from-gold/20 to-gold/10 p-6 border-b border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-white">
                      {config.type || config.bhk_type || `${config.beds} BHK`}
                    </h3>
                    <Home className="w-6 h-6 text-gold" />
                  </div>
                  <p className="text-white/60 text-sm uppercase tracking-wider">
                    {config.category || "Apartment"}
                  </p>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-5 h-5 text-gold" />
                      <span className="text-sm text-white/60 uppercase tracking-wider">Price</span>
                    </div>
                    <p className="text-2xl font-bold text-white">
                      {typeof config.price === 'number' 
                        ? `AED ${config.price.toLocaleString()}` 
                        : config.price || "Contact for Price"}
                    </p>
                  </div>

                  {/* Specifications */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Maximize className="w-4 h-4 text-gold" />
                        <span className="text-white/70 text-sm">Area</span>
                      </div>
                      <span className="text-white font-semibold">
                        {config.size || config.area || "N/A"} Sq.Ft
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Bed className="w-4 h-4 text-gold" />
                        <span className="text-white/70 text-sm">Bedrooms</span>
                      </div>
                      <span className="text-white font-semibold">
                        {config.beds || config.bedrooms || "N/A"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Bath className="w-4 h-4 text-gold" />
                        <span className="text-white/70 text-sm">Bathrooms</span>
                      </div>
                      <span className="text-white font-semibold">
                        {config.baths || config.bathrooms || "N/A"}
                      </span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button className="w-full gradient-gold text-black hover:shadow-gold">
                    Get Price Details
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Payment Plan */}
        {paymentPlan && paymentPlan.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Flexible Payment Plan
              </h3>
              <p className="text-white/70">Easy payment options tailored to your needs</p>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="space-y-4">
                {paymentPlan.map((plan, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <p className="text-white font-semibold">{plan.stage || plan.milestone}</p>
                        <p className="text-white/60 text-sm">{plan.description || plan.details}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gold">{plan.percentage}%</p>
                      <p className="text-white/60 text-sm">{plan.timing || plan.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Investment Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gold/10 border border-gold/30 rounded-full">
            <TrendingUp className="w-5 h-5 text-gold" />
            <span className="text-white font-medium">
              High ROI Potential • Tax Benefits • Prime Location
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DubaiProjectPricing;
