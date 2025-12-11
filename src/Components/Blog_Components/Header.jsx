import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X, ArrowUp } from 'lucide-react';

const Header = ({ search, setSearch, sort, setSort }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <Link to="/blog" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-white/20 to-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-300">
                <span className="text-white font-serif font-bold text-lg">1</span>
              </div>
              <div>
                <h1 className="font-serif font-bold text-xl text-white">100acress</h1>
                <p className="text-xs text-gray-400 font-sans">Blog</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                to="/blog" 
                className="text-gray-300 hover:text-white font-sans text-sm font-medium transition-colors duration-200"
              >
                Stories
              </Link>
              <Link 
                to="/projects" 
                className="text-gray-300 hover:text-white font-sans text-sm font-medium transition-colors duration-200"
              >
                Projects
              </Link>
              <Link 
                to="/about" 
                className="text-gray-300 hover:text-white font-sans text-sm font-medium transition-colors duration-200"
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-300 hover:text-white font-sans text-sm font-medium transition-colors duration-200"
              >
                Contact
              </Link>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              
              {/* Search Toggle (Desktop) */}
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300"
                aria-label="Toggle search"
              >
                <Search className="h-4 w-4 text-gray-400" />
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-4 w-4 text-gray-400" />
                ) : (
                  <Menu className="h-4 w-4 text-gray-400" />
                )}
              </button>

              {/* Scroll to Top */}
              <button
                onClick={scrollToTop}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
                aria-label="Scroll to top"
              >
                <ArrowUp className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Search Bar (Expanded) */}
          {showSearch && (
            <div className="py-4 border-t border-white/10">
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search stories, topics, and insights..."
                    className="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-white placeholder-gray-400 font-sans focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all duration-300"
                  />
                  {search && (
                    <button
                      onClick={() => setSearch('')}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                
                {/* Sort Options */}
                <div className="flex items-center justify-center mt-4 space-x-4">
                  <span className="text-sm text-gray-400 font-sans">Sort by:</span>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="px-3 py-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg text-white text-sm font-sans focus:outline-none focus:border-white/20 transition-all duration-300"
                  >
                    <option value="latest" className="bg-slate-800">Latest</option>
                    <option value="oldest" className="bg-slate-800">Oldest</option>
                    <option value="popular" className="bg-slate-800">Popular</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-slate-900/80 backdrop-blur-xl">
            <div className="px-6 py-4 space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search stories..."
                  className="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-white placeholder-gray-400 font-sans focus:outline-none focus:border-white/20 transition-all duration-300"
                />
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-2">
                <Link 
                  to="/blog" 
                  className="block px-4 py-2 text-gray-300 hover:text-white font-sans font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Stories
                </Link>
                <Link 
                  to="/projects" 
                  className="block px-4 py-2 text-gray-300 hover:text-white font-sans font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Projects
                </Link>
                <Link 
                  to="/about" 
                  className="block px-4 py-2 text-gray-300 hover:text-white font-sans font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  to="/contact" 
                  className="block px-4 py-2 text-gray-300 hover:text-white font-sans font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </nav>

              {/* Mobile Sort */}
              <div className="flex items-center space-x-3 pt-2 border-t border-white/10">
                <span className="text-sm text-gray-400 font-sans">Sort:</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="px-3 py-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg text-white text-sm font-sans focus:outline-none focus:border-white/20 transition-all duration-300"
                >
                  <option value="latest" className="bg-slate-800">Latest</option>
                  <option value="oldest" className="bg-slate-800">Oldest</option>
                  <option value="popular" className="bg-slate-800">Popular</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
