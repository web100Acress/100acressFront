export const DevelopersSection = () => {
  const developers = [
    { name: "EMAAR", logo: "EMAAR" },
    { name: "DAMAC", logo: "DAMAC" },
    { name: "NAKHEEL", logo: "NAKHEEL" },
    { name: "SOBHA", logo: "SOBHA" },
    { name: "MERAAS", logo: "MERAAS" },
    { name: "AZIZI", logo: "AZIZI" },
    { name: "DANUBE", logo: "DANUBE" },
    { name: "ALDAR", logo: "ALDAR" },
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {developers.map((developer, index) => (
            <div
              key={developer.name}
              className="group relative aspect-square glass-effect rounded-xl border border-white/10 hover:border-gold/50 transition-all duration-500 flex items-center justify-center shimmer animate-fade-in-scale"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-center p-6">
                <p className="text-2xl md:text-3xl font-display font-bold text-white group-hover:text-gold transition-colors duration-300">
                  {developer.logo}
                </p>
              </div>
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 gradient-gold opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl" />
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
