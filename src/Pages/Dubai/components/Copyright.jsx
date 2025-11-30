export const Copyright = () => {
  return (
    <div className="py-6 text-center text-sm text-gray-400 border-t border-white/10 bg-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Copyright */}
          <div className="text-center lg:text-left">
            <p>© 2025 100acress Dubai. All rights reserved.</p>
          </div>
          
          {/* Right Column - Policy Links */}
          <div className="flex justify-center lg:justify-end items-center gap-4">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <span className="text-gray-600">|</span>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
            <span className="text-gray-600">|</span>
            <a href="#" className="hover:text-gold transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
};
