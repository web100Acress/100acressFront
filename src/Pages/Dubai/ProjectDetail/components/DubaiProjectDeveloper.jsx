import { motion } from "framer-motion";
import { Building2, Award, CheckCircle, TrendingUp } from "lucide-react";

const DubaiProjectDeveloper = ({ project }) => {
  const developerName = project?.builderName || "Premium Developer";
  const developerLogo = project?.builderLogo?.url || project?.companyLogo?.url;
  const developerDescription = project?.builderDescription || "A leading real estate developer in UAE";
  const developerWebsite = project?.builderWebsite;
  
  // Developer achievements
  const achievements = project?.developerAchievements || [
    { title: "Years of Excellence", value: "20+", icon: Award },
    { title: "Projects Delivered", value: "50+", icon: Building2 },
    { title: "Happy Families", value: "10,000+", icon: CheckCircle },
    { title: "Customer Satisfaction", value: "98%", icon: TrendingUp }
  ];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-black/95 to-black relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

      <div className="container relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase mb-4 block">
            Trusted Developer
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            About The Developer
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold to-gold/50 mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Developer Logo */}
            {developerLogo && (
              <div className="mb-8 p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl inline-block">
                <img
                  src={developerLogo}
                  alt={`${developerName} Logo`}
                  className="h-20 w-auto"
                />
              </div>
            )}

            <h3 className="text-3xl font-bold text-white mb-6">
              {developerName}
            </h3>

            <div className="prose prose-invert prose-lg max-w-none mb-8">
              <p className="text-white/80 leading-relaxed">
                {developerDescription}
              </p>
            </div>

            {/* Developer Website */}
            {developerWebsite && (
              <a
                href={developerWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gold/10 border border-gold/30 rounded-lg text-gold hover:bg-gold/20 transition-colors"
              >
                <Building2 className="w-5 h-5" />
                Visit Developer Website
              </a>
            )}

            {/* Additional Info */}
            <div className="mt-8 p-6 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl">
              <h4 className="text-lg font-semibold text-white mb-4">Why Choose Us?</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-white/70">
                  <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span>Commitment to quality and timely delivery</span>
                </li>
                <li className="flex items-start gap-3 text-white/70">
                  <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span>Award-winning architectural designs</span>
                </li>
                <li className="flex items-start gap-3 text-white/70">
                  <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span>Transparent business practices</span>
                </li>
                <li className="flex items-start gap-3 text-white/70">
                  <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span>Customer-centric approach</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Right Content - Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 gap-6">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-gold/50 hover:bg-white/[0.15] transition-all duration-300 text-center">
                      <div className="w-14 h-14 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/30 group-hover:scale-110 transition-all duration-300">
                        <Icon className="w-7 h-7 text-gold" />
                      </div>
                      <div className="text-4xl font-bold text-gold mb-2">
                        {achievement.value}
                      </div>
                      <p className="text-white/70 text-sm leading-tight">
                        {achievement.title}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-8 p-6 bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/30 rounded-xl"
            >
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-gold" />
                Certifications & Awards
              </h4>
              <div className="space-y-2 text-white/70">
                
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                  ISO 9001:2015 Certified
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                  Best Developer Award 2023
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                  Green Building Certification
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DubaiProjectDeveloper;
