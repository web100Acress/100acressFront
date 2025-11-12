import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Download, Calendar, Building2, Ruler, DollarSign } from "lucide-react";
import { Button } from "../../../../Components/ui/button";

const DubaiProjectHero = ({ project }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const heroImage = project?.frontImage?.url || project?.images?.[0]?.url || "/Images/logo.png";
  const projectName = project?.projectName || "Luxury Property";
  const location = project?.city || "Dubai";
  const price = project?.minPrice || "Contact for Price";
  const area = project?.projectArea || project?.size || "N/A";
  const possession = project?.possession || "Ready to Move";
  const developer = project?.builderName || "Premium Developer";

  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <motion.div 
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: imageLoaded ? 1 : 1.1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <img
          src={heroImage}
          alt={`${projectName} in ${location}`}
          className="w-full h-full object-cover"
          onLoad={() => setImageLoaded(true)}
          loading="eager"
        />
        {/* Gradient Overlays - UAE inspired gold tones */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/40" />
      </motion.div>

      {/* Decorative Arabic Pattern Border - Top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
      
      {/* Content Container */}
      <div className="relative h-full container flex flex-col justify-end pb-20 md:pb-32">
        <div className="max-w-4xl">
          {/* Property Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 backdrop-blur-md border border-gold/30 rounded-full mb-6"
          >
            <Building2 className="w-4 h-4 text-gold" />
            <span className="text-gold text-sm font-medium tracking-wider uppercase">
              {project?.projectStatus || "Premium Property"}
            </span>
          </motion.div>

          {/* Project Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-4 leading-tight"
          >
            {projectName}
          </motion.h1>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2 mb-8"
          >
            <MapPin className="w-5 h-5 text-gold" />
            <span className="text-xl text-white/90">{location}, UAE</span>
          </motion.div>

          {/* Quick Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            {/* Price */}
            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-4 hover:border-gold/50 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-gold" />
                <span className="text-xs text-white/60 uppercase tracking-wider">Starting Price</span>
              </div>
              <p className="text-lg font-semibold text-white">
                {typeof price === 'number' ? `AED ${price.toLocaleString()}` : price}
              </p>
            </div>

            {/* Area */}
            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-4 hover:border-gold/50 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <Ruler className="w-4 h-4 text-gold" />
                <span className="text-xs text-white/60 uppercase tracking-wider">Area</span>
              </div>
              <p className="text-lg font-semibold text-white">{area} Sq.Ft</p>
            </div>

            {/* Possession */}
            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-4 hover:border-gold/50 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-gold" />
                <span className="text-xs text-white/60 uppercase tracking-wider">Possession</span>
              </div>
              <p className="text-lg font-semibold text-white">{possession}</p>
            </div>

            {/* Developer */}
            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-4 hover:border-gold/50 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-4 h-4 text-gold" />
                <span className="text-xs text-white/60 uppercase tracking-wider">Developer</span>
              </div>
              <p className="text-lg font-semibold text-white truncate">{developer}</p>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <Button 
              size="lg" 
              className="gradient-gold text-black hover:shadow-gold group px-8"
            >
              <Phone className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              Request Callback
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="border-gold text-gold hover:bg-gold hover:text-black px-8"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Brochure
            </Button>

            <a
              href={`https://wa.me/971501234567?text=Hi, I'm interested in ${encodeURIComponent(projectName)} in ${location}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button 
                size="lg" 
                variant="outline"
                className="border-white/20 text-white hover:border-green-500 hover:text-green-500 px-8"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </Button>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gold rounded-full flex items-start justify-center p-2"
        >
          <motion.div className="w-1 h-2 bg-gold rounded-full" />
        </motion.div>
      </motion.div>

      {/* Decorative Arabic Pattern Border - Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
    </section>
  );
};

export default DubaiProjectHero;
