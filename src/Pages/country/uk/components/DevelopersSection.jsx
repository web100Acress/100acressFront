import { Link } from "react-router-dom";
export const DevelopersSection = () => {
  const developers = [
    {
      id: "berkeley-homes",
      name: "Berkeley Homes",
      logo: "BERKELEY",
      logoUrl: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/uk/developers/berkeley-homes-logo.png"
    },
    {
      id: "barratt-homes",
      name: "Barratt Homes",
      logo: "BARRATT",
      logoUrl: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/uk/developers/barratt-homes-logo.png"
    },
    {
      id: "taylor-wimpey",
      name: "Taylor Wimpey",
      logo: "TAYLOR WIMPEY",
      logoUrl: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/uk/developers/taylor-wimpey-logo.png"
    },
    {
      id: "persimmon-homes",
      name: "Persimmon Homes",
      logo: "PERSIMMON",
      logoUrl: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/uk/developers/persimmon-homes-logo.png"
    },
    {
      id: "redrow-homes",
      name: "Redrow Homes",
      logo: "REDROW",
      logoUrl: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/uk/developers/redrow-homes-logo.png"
    },
    {
      id: "crest-nicholson",
      name: "Crest Nicholson",
      logo: "CREST",
      logoUrl: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/uk/developers/crest-nicholson-logo.png"
    },
    {
      id: "bellway-homes",
      name: "Bellway Homes",
      logo: "BELLWAY",
      logoUrl: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/uk/developers/bellway-homes-logo.png"
    },
    {
      id: "bovis-homes",
      name: "Bovis Homes",
      logo: "BOVIS",
      logoUrl: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/uk/developers/bovis-homes-logo.png"
    }
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
            Top Developers in United Kingdom
          </h2>
          <p className="text-sm sm:text-base lg:text-xl text-muted-foreground max-w-lg sm:max-w-2xl mx-auto">
            Invest in the finest projects in UK featuring luxury apartments and high-ROI properties from the country's most trusted developers.
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
            <p className="text-4xl font-bold text-gold">40+</p>
            <p className="text-sm text-muted-foreground uppercase tracking-wider">
              Verified Developers
            </p>
          </div>
          <div className="text-center space-y-2">
            <p className="text-4xl font-bold text-gold">800+</p>
            <p className="text-sm text-muted-foreground uppercase tracking-wider">
              Premium Projects
            </p>
          </div>
          <div className="text-center space-y-2">
            <p className="text-4xl font-bold text-gold">3000+</p>
            <p className="text-sm text-muted-foreground uppercase tracking-wider">
              Happy Clients
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
