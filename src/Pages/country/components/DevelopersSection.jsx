import { Link } from "react-router-dom";
export const DevelopersSection = () => {
  const developers = [
    {
      id: "emaar-properties",
      name: "Emaar Properties",
      logo: "EMAAR",
      logoUrl: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/dubai/dubai-devloper-logo/Emaar-Properties-Logo-1.png"
    },
    {
      id: "damac-properties",
      name: "DAMAC",
      logo: "DAMAC",
      logoUrl: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/dubai/dubai-devloper-logo/Damac_logo.svg.png"
    },
    {
      id: "sobha-realty",
      name: "Sobha",
      logo: "SOBHA",
      logoUrl: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/dubai/dubai-devloper-logo/Sobha_(company).svg.png"
    },

 {
      id: "danube-properties",
      name: "Danube",
      logo: "DANUBE",
      logoUrl: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/dubai/dubai-devloper-logo/DANUBE.png"
    },


      {
      id: "binghatti-developers",
      name: "Binghatti",
      logo: "BINGHATTI",
      logoUrl: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/dubai/dubai-devloper-logo/Binghatti-logo-dark.webp.png"
    },

       {
      id: "bnw-properties",
      name: "BNW",
      logo: "BNW",
      logoUrl: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/dubai/dubai-devloper-logo/bnw_properties_logo.png"
    },
    {
      id: "nakheel-properties",
      name: "Nakheel",
      logo: "NAKHEEL",
      logoUrl: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/dubai/dubai-devloper-logo/idBSCaoKfO_1762680043330.png"
    },
    {
      id: "meraas-properties",
      name: "Meraas",
      logo: "MERAAS",
      logoUrl: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/dubai/dubai-devloper-logo/dev_logo_1829_meraas345-261.png"
    },
  
    {
      id: "aldar-properties",
      name: "Aldar",
      logo: "ALDAR",
      logoUrl: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/dubai/dubai-devloper-logo/Aldra-logo.png"
    },
    {
      id: "omniyat-properties",
      name: "Omniyat",
      logo: "OMNIYAT",
      logoUrl: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/dubai/dubai-devloper-logo/Omniyat.png"
    },
 
   
  ];

  return (
    <section id="developers" className="py-24 relative overflow-hidden border-y border-white/10">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent">
        <div className="absolute inset-0 backdrop-blur-sm">
          <div className="h-full w-full bg-gradient-to-br from-gold/5 via-transparent to-gold/5 animate-pulse" />
        </div>
      </div>

      <div className="container relative">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 space-y-3 sm:space-y-4 px-4 animate-fade-in">
          <span className="text-gold text-xs sm:text-sm font-medium tracking-[0.2em] sm:tracking-[0.3em] uppercase">
            Trusted Partners
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-white leading-tight">
            Top Developers Projects in Dubai
          </h2>
          <p className="text-sm sm:text-base lg:text-xl text-muted-foreground max-w-lg sm:max-w-2xl mx-auto">
            Invest in the finest projects in Dubai featuring luxury apartments and high-ROI properties from the city's most trusted developers.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 max-w-6xl mx-auto px-4">
          {developers.map((developer, index) => (
            <Link
              key={developer.id}
              to={`/developers/${developer.id}/`}
              className="group flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg transition-all duration-300 cursor-pointer text-center relative overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-center p-4 w-full h-full flex items-center justify-center relative z-10">
                <img
                  src={developer.logoUrl}
                  alt={developer.name}
                  className="max-w-[80%] max-h-[80%] object-contain transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <p className="hidden text-2xl md:text-3xl font-display font-bold text-gray-800 group-hover:text-gold transition-colors duration-300">
                  {developer.logo}
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/10">
          <div className="text-center space-y-2">
            <p className="text-4xl font-bold text-gold">50+</p>
            <p className="text-sm text-muted-foreground uppercase tracking-wider">
              Verified Developers
            </p>
          </div>
          <div className="text-center space-y-2">
            <p className="text-4xl font-bold text-gold">1000+</p>
            <p className="text-sm text-muted-foreground uppercase tracking-wider">
              Premium Projects
            </p>
          </div>
          <div className="text-center space-y-2">
            <p className="text-4xl font-bold text-gold">5000+</p>
            <p className="text-sm text-muted-foreground uppercase tracking-wider">
              Happy Clients
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
