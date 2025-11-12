import { motion } from "framer-motion";
import { MapPin, Navigation, Clock, Car, Plane, Building2 } from "lucide-react";

const DubaiProjectLocation = ({ project }) => {
  const location = project?.city || "Dubai";
  const address = project?.address || project?.location || "Prime Location, UAE";
  const mapUrl = project?.mapUrl || project?.googleMapUrl;
  
  // Nearby landmarks
  const landmarks = project?.nearbyPlaces || project?.connectivity || [
    { name: "Dubai Mall", distance: "5 km", time: "10 mins", icon: "shopping" },
    { name: "Burj Khalifa", distance: "6 km", time: "12 mins", icon: "landmark" },
    { name: "Dubai International Airport", distance: "15 km", time: "20 mins", icon: "airport" },
    { name: "Dubai Marina", distance: "8 km", time: "15 mins", icon: "marina" },
    { name: "Business Bay", distance: "4 km", time: "8 mins", icon: "business" },
    { name: "Downtown Dubai", distance: "7 km", time: "14 mins", icon: "downtown" }
  ];

  const getIcon = (iconType) => {
    const icons = {
      airport: Plane,
      shopping: Building2,
      landmark: Building2,
      marina: Navigation,
      business: Building2,
      downtown: Building2,
      default: MapPin
    };
    return icons[iconType] || icons.default;
  };

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-black to-black/95 relative overflow-hidden">
      <div className="container relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase mb-4 block">
            Prime Location
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Strategic Location in
            <span className="block text-gold">{location}</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold to-gold/50 mx-auto mb-6" />
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            {address}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-video rounded-2xl overflow-hidden border border-white/10 bg-white/5">
              {mapUrl ? (
                <iframe
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${project?.projectName} Location Map`}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/10 to-white/5">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-gold mx-auto mb-4" />
                    <p className="text-white/70">Map location coming soon</p>
                  </div>
                </div>
              )}
            </div>

            {/* Address Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-6 p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-xl"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Project Address</h3>
                  <p className="text-white/70 leading-relaxed">{address}</p>
                  {mapUrl && (
                    <a
                      href={mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-4 text-gold hover:text-gold/80 transition-colors"
                    >
                      <Navigation className="w-4 h-4" />
                      <span>Get Directions</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Connectivity Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="w-2 h-8 bg-gold rounded-full" />
              Nearby Landmarks
            </h3>

            <div className="space-y-4">
              {landmarks.map((landmark, index) => {
                const Icon = getIcon(landmark.icon);
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="flex items-center justify-between p-5 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl hover:border-gold/50 hover:bg-white/10 transition-all duration-300">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex-shrink-0 w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                          <Icon className="w-6 h-6 text-gold" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-semibold mb-1">
                            {landmark.name || landmark.place}
                          </h4>
                          <div className="flex items-center gap-4 text-sm text-white/60">
                            <span className="flex items-center gap-1">
                              <Car className="w-3 h-3" />
                              {landmark.distance}
                            </span>
                            {landmark.time && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {landmark.time}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Connectivity Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 p-6 bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/30 rounded-xl"
            >
              <h4 className="text-lg font-semibold text-white mb-4">
                Excellent Connectivity
              </h4>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                  Easy access to major highways
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                  Close to metro stations
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                  Well-connected to business districts
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                  Near shopping and entertainment hubs
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DubaiProjectLocation;
