import { motion } from "framer-motion";
import { Building2, Award, Shield, TrendingUp } from "lucide-react";

const DubaiProjectAbout = ({ project }) => {
  const description = project?.description || project?.aboutProject || "Discover luxury living in the heart of UAE.";
  const highlights = [
    {
      icon: Building2,
      title: "Premium Architecture",
      description: "World-class design by renowned architects"
    },
    {
      icon: Award,
      title: "Award Winning",
      description: "Recognized for excellence in real estate"
    },
    {
      icon: Shield,
      title: "RERA Approved",
      description: "Fully compliant with UAE regulations"
    },
    {
      icon: TrendingUp,
      title: "High ROI",
      description: "Excellent investment opportunity"
    }
  ];

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase mb-4 block">
              About The Project
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Experience Unparalleled
              <span className="block text-gold">Luxury Living</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gold to-gold/50 mb-8" />
            
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-white/80 leading-relaxed text-lg">
                {description}
              </p>
            </div>

            {/* Developer Info */}
            {project?.builderName && (
              <div className="mt-8 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
                <p className="text-sm text-white/60 uppercase tracking-wider mb-2">Developed By</p>
                <h3 className="text-2xl font-bold text-white">{project.builderName}</h3>
                {project?.builderDescription && (
                  <p className="text-white/70 mt-2">{project.builderDescription}</p>
                )}
              </div>
            )}
          </motion.div>

          {/* Right Content - Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-6"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-gold/50 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                  <item.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/60">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats Section */}
        {(project?.totalUnits || project?.totalTowers || project?.totalFloors) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {project.totalTowers && (
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-gold mb-2">
                  {project.totalTowers}
                </div>
                <div className="text-white/60 uppercase tracking-wider text-sm">Towers</div>
              </div>
            )}
            {project.totalFloors && (
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-gold mb-2">
                  {project.totalFloors}
                </div>
                <div className="text-white/60 uppercase tracking-wider text-sm">Floors</div>
              </div>
            )}
            {project.totalUnits && (
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-gold mb-2">
                  {project.totalUnits}
                </div>
                <div className="text-white/60 uppercase tracking-wider text-sm">Units</div>
              </div>
            )}
            {project.projectArea && (
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-gold mb-2">
                  {project.projectArea}
                </div>
                <div className="text-white/60 uppercase tracking-wider text-sm">Sq.Ft</div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default DubaiProjectAbout;
