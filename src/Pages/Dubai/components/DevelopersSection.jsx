import { useNavigate } from "react-router-dom";

export const DevelopersSection = () => {
  const navigate = useNavigate();
  
  const developers = [
    { 
      id: "emaar", 
      name: "Emaar Properties", 
      logo: "EMAAR",
      logoUrl: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/dubai/dubai-devloper-logo/Emaar-Properties-Logo-1.png"
    },
    { 
      id: "damac", 
      name: "DAMAC", 
      logo: "DAMAC",
      logoUrl: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/dubai/dubai-devloper-logo/Damac_logo.svg.png"
    },
    { 
      id: "sobha", 
      name: "Sobha", 
      logo: "SOBHA",
      logoUrl: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/dubai/dubai-devloper-logo/Sobha_(company).svg.png"
    },
    { 
      id: "nakheel", 
      name: "Nakheel", 
      logo: "NAKHEEL",
      logoUrl: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/dubai/dubai-devloper-logo/idBSCaoKfO_1762680043330.png"
    },
    { 
      id: "meraas", 
      name: "Meraas", 
      logo: "MERAAS",
      logoUrl: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/dubai/dubai-devloper-logo/dev_logo_1829_meraas345-261.png"
    },
    { 
      id: "binghatti", 
      name: "Binghatti", 
      logo: "BINGHATTI",
      logoUrl: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/dubai/dubai-devloper-logo/Binghatti-logo-dark.webp.png"
    },
    { 
      id: "aldar", 
      name: "Aldar", 
      logo: "ALDAR",
      logoUrl: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/dubai/dubai-devloper-logo/Aldra-logo.png"
    },
    { 
      id: "omniyat", 
      name: "Omniyat", 
      logo: "OMNIYAT",
      logoUrl: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/dubai/dubai-devloper-logo/Omniyat.png"
    },
    { 
      id: "bnw", 
      name: "BNW", 
      logo: "BNW",
      logoUrl: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/dubai/dubai-devloper-logo/bnw_properties_logo.png"
    },
    { 
      id: "danube", 
      name: "Danube", 
      logo: "DANUBE",
      logoUrl: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/dubai/dubai-devloper-logo/DANUBE.png"
    },
  ];

  return (
    <section id="developers" className="py-24 relative overflow-hidden border-y border-white/10">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-dark to-black" />
      
      <div className="container relative">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
            Trusted Partners
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white">
            Top Developers
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Partnering with Dubai's most prestigious property developers
          </p>
        </div>

        {/* Developers Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {developers.map((developer, index) => (
            <div
              key={developer.name}
              // onClick={() => navigate(`/united-arab-emirates/developer/${developer.id}/`)}
              className="group relative aspect-square rounded-lg border border-white/10 hover:border-gold/50 transition-all duration-500 flex items-center justify-center animate-fade-in-scale cursor-pointer overflow-hidden bg-white/95 hover:bg-white"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-center p-4 w-full h-full flex items-center justify-center">
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
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
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
