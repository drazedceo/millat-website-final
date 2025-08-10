import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navigationLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Manufacturing', href: '/manufacturing' },
    { name: 'Certifications', href: '/certifications' },
    { name: 'Industries Served', href: '/industries' },
  ];

  const productCategories = [
    { name: 'Category 1', href: '/products/category1' },
    { name: 'Category 2', href: '/products/category2' },
    { name: 'Category 3', href: '/products/category3' },
    { name: 'Category 4', href: '/products/category4' },
    { name: 'Category 5', href: '/products/category5' },
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
          <img src="/images/logo.png" alt="Millat Polymer Logo" className="w-32 object-contain" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-x-3 text-gray-800 font-medium text-sm tracking-wide relative">
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

          {/* Products with Mega Menu */}
          <div
            className="relative"
            onMouseEnter={() => setIsProductsOpen(true)}
            onMouseLeave={() => setIsProductsOpen(false)}
          >
            <button
              className={`relative px-2.5 py-2 whitespace-nowrap transition-all duration-200 ${
                location.pathname.startsWith('/products')
                  ? 'text-[#00B9B3] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#00B9B3]'
                  : 'hover:text-[#00B9B3]'
              }`}
            >
              Products
            </button>

            {/* Mega Menu */}
            {isProductsOpen && (
              <div className="absolute left-0 top-full w-screen bg-white shadow-xl border-t border-gray-200 animate-slideDown">
                <div className="max-w-7xl mx-auto px-8 py-6 grid grid-cols-3 gap-6">
                  {productCategories.map((category) => (
                    <Link
                      key={category.name}
                      to={category.href}
                      className="p-4 rounded-lg hover:bg-gray-50 transition"
                    >
                      <div className="font-semibold text-gray-800">{category.name}</div>
                      <p className="text-sm text-gray-500 mt-1">
                        Short description of {category.name}.
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
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
            <img src="/images/logo.png" alt="Millat Polymer" className="w-[180px] object-contain" />
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

      {/* Animation for dropdown */}
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease forwards;
        }
      `}</style>
    </header>
  );
};

export default Header;
