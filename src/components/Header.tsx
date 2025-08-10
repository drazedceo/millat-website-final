import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProductsDropdown, setShowProductsDropdown] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const location = useLocation();

  // Example data — replace with your real categories/products
  const productsData = [
    {
      category: "Pipes",
      slug: "/products/pipes",
      products: [
        { name: "PVC Pipe", slug: "/products/pipes/pvc-pipe" },
        { name: "HDPE Pipe", slug: "/products/pipes/hdpe-pipe" },
      ],
    },
    {
      category: "Fittings",
      slug: "/products/fittings",
      products: [
        { name: "Elbow Fitting", slug: "/products/fittings/elbow" },
        { name: "Tee Fitting", slug: "/products/fittings/tee" },
      ],
    },
    {
      category: "Valves",
      slug: "/products/valves",
      products: [
        { name: "Gate Valve", slug: "/products/valves/gate" },
        { name: "Ball Valve", slug: "/products/valves/ball" },
      ],
    },
  ];

  const navigationLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Manufacturing", href: "/manufacturing" },
    { name: "Certifications", href: "/certifications" },
    { name: "Industries Served", href: "/industries" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`sticky top-0 z-50 h-20 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-white shadow-sm"
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
        <nav className="hidden lg:flex items-center gap-x-3 text-gray-800 font-medium text-sm tracking-wide relative">
          {navigationLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`relative px-2.5 py-2 whitespace-nowrap transition-all duration-200 ${
                location.pathname === link.href
                  ? "text-[#00B9B3] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#00B9B3]"
                  : "hover:text-[#00B9B3]"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Products Link */}
          <div
            className="relative"
            onMouseEnter={() => {
              setShowProductsDropdown(true);
              setActiveCategory(productsData[0]); // default first category
            }}
            onMouseLeave={() => setShowProductsDropdown(false)}
          >
            <button
              className={`relative px-2.5 py-2 whitespace-nowrap transition-all duration-200 ${
                location.pathname.startsWith("/products")
                  ? "text-[#00B9B3] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#00B9B3]"
                  : "hover:text-[#00B9B3]"
              }`}
            >
              Products
            </button>

            {/* Full-width Dropdown */}
            {showProductsDropdown && (
              <div className="absolute left-0 top-full w-screen bg-white shadow-xl border-t border-gray-200 py-6 z-50">
                <div className="max-w-7xl mx-auto px-6 flex">
                  {/* Categories */}
                  <div className="w-1/3 pr-6 border-r border-gray-100">
                    <h4 className="font-bold text-gray-900 mb-4">
                      Product Categories
                    </h4>
                    <ul className="space-y-2">
                      {productsData.map((cat) => (
                        <li key={cat.category}>
                          <button
                            className={`block w-full text-left px-3 py-2 rounded-md transition ${
                              activeCategory?.category === cat.category
                                ? "bg-[#00B9B3] text-white"
                                : "hover:bg-gray-100 text-gray-800"
                            }`}
                            onMouseEnter={() => setActiveCategory(cat)}
                            onClick={() => (window.location.href = cat.slug)}
                          >
                            {cat.category}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Products */}
                  <div className="w-2/3 pl-6">
                    <h4 className="font-bold text-gray-900 mb-4">
                      {activeCategory?.category} Products
                    </h4>
                    <ul className="grid grid-cols-2 gap-3">
                      {activeCategory?.products.map((prod) => (
                        <li key={prod.name}>
                          <Link
                            to={prod.slug}
                            className="block px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700"
                          >
                            {prod.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
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
    </header>
  );
};

export default Header;
