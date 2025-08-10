import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect for header style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navigationLinks = [
    { name: 'Home', href: '/' },
    { name: 'Company', href: '/about' },
    { name: 'Manufacturing', href: '/manufacturing' },
    { name: 'Certifications', href: '/certifications' },
    { name: 'Industries Served', href: '/industries' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 h-20 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img
            src="/images/logo.png"
            alt="Millat Polymer Logo"
            className="w-32 object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-x-3 text-gray-800 font-medium text-sm tracking-wide">
          {navigationLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`relative px-2.5 py-2 whitespace-nowrap transition-all duration-200 ${
                location.pathname === link.href
                  ? 'text-[#00B9B3] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#00B9B3]'
                  : 'hover:text-[#00B9B3]'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/products"
            className={`relative px-2.5 py-2 whitespace-nowrap transition-all duration-200 ${
              location.pathname === '/products'
                ? 'text-[#00B9B3] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#00B9B3]'
                : 'hover:text-[#00B9B3]'
            }`}
          >
            Products
          </Link>
        </nav>

        {/* CTA Button */}
        <Link
          to="/contact"
          className="hidden lg:inline-block bg-[#FF6F3C] text-white px-5 py-3 rounded-full shadow-md hover:bg-opacity-90 transition-all duration-200 font-semibold text-sm"
        >
          get in<br />touch
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 text-gray-700 hover:text-[#00B9B3] transition-colors"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="p-4 flex justify-between items-center">
            <img
              src="/images/logo.png"
              alt="Millat Polymer"
              className="w-[180px] object-contain"
            />
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-gray-700 hover:text-[#00B9B3] transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Scrollable Links */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`block text-base font-semibold transition-colors py-2.5 border-b border-gray-100 tracking-wide whitespace-nowrap ${
                  location.pathname === link.href
                    ? 'text-[#00B9B3]'
                    : 'text-gray-700 hover:text-[#00B9B3]'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/products"
              className={`block text-base font-semibold transition-colors py-2.5 border-b border-gray-100 tracking-wide whitespace-nowrap ${
                location.pathname === '/products'
                  ? 'text-[#00B9B3]'
                  : 'text-gray-700 hover:text-[#00B9B3]'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/contact"
              className="bg-[#FF6F3C] text-white px-4 py-3 rounded-full shadow-md hover:bg-opacity-90 transition-all duration-200 font-medium inline-block mt-4 text-center text-sm leading-tight"
              onClick={() => setIsMenuOpen(false)}
            >
              get in<br />touch
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
