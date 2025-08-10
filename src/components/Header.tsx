import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when navigating
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const navigationLinks = [
    { name: "Home", href: "/" },
    { name: "Company", href: "/company" },
    { name: "Manufacturing", href: "/manufacturing" },
    { name: "Certifications", href: "/certifications" },
    { name: "Industries Served", href: "/industries" },
    {
      name: "Products",
      href: "/products",
      submenu: [
        {
          category: "Rubber Components",
          items: [
            { name: "Custom Molded Rubber", href: "/products/custom-molded" },
            { name: "Anti-Vibration Parts", href: "/products/anti-vibration" },
            { name: "Metal to Rubber Bonded Bush", href: "/products/bonded-bush" },
            { name: "Rickshaw Engine Mounting", href: "/products/rickshaw-mounting" },
            { name: "Air Cleaner Hose", href: "/products/air-cleaner-hose" },
            { name: "Air Cleaner Hosing", href: "/products/air-cleaner-hosing" },
            { name: "Hand-Fabricated Rubber Hoses", href: "/products/hand-fabricated-hoses" },
            { name: "Intercooler / Turbo Hoses", href: "/products/intercooler-hoses" },
            { name: "Breather & Vacuum Hoses", href: "/products/breather-hoses" },
            { name: "Heater & Fuel Hoses", href: "/products/heater-fuel-hoses" },
            { name: "Silicone Rubber Hoses", href: "/products/silicone-hoses" },
            { name: "Flexible Rubber Hoses", href: "/products/flexible-hoses" },
            { name: "Industrial Rubber Hoses", href: "/products/industrial-hoses" }
          ]
        },
        {
          category: "Plastic Components",
          items: [
            { name: "Injection Molded Parts", href: "/products/injection-molded" },
            { name: "Plastic Caps & Plugs", href: "/products/caps-plugs" },
            { name: "Plastic Bushes", href: "/products/plastic-bushes" },
            { name: "Plastic Housings & Covers", href: "/products/plastic-housings" },
            { name: "Plastic Door Handles", href: "/products/plastic-door-handles" },
            { name: "Plastic Window Handles", href: "/products/plastic-window-handles" },
            { name: "Metal & Plastic Automotive Parts", href: "/products/metal-plastic-parts" }
          ]
        },
        {
          category: "PVC & Utility Components",
          items: [
            { name: "PVC Pipes", href: "/products/pvc-pipes" },
            { name: "HDPE Pipe Systems", href: "/products/hdpe-pipes" },
            { name: "EPDM / Silicone Profiles", href: "/products/epdm-profiles" },
            { name: "RCC Pipe Gaskets", href: "/products/rcc-gaskets" },
            { name: "Rubber Sheets & EPDM Extrusions", href: "/products/rubber-sheets" }
          ]
        }
      ]
    }
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-white shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img
            src="/images/logo.png"
            alt="Millat Polymer Logo"
            className="w-32 object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-x-3 font-medium text-sm tracking-wide relative">
          {navigationLinks.map((link) => (
            <div
              key={link.name}
              className="relative group"
              onMouseEnter={() => setActiveDropdown(link.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to={link.href}
                className={`relative px-3 py-2 whitespace-nowrap transition-all duration-200 rounded ${
                  location.pathname === link.href
                    ? "bg-[#FF6F3C] text-white"
                    : "hover:bg-[#FF6F3C] hover:text-white"
                } flex items-center`}
              >
                {link.name}
                {link.submenu && <ChevronDown size={14} className="ml-1" />}
              </Link>

              {/* Dropdown Menu */}
              {link.submenu && activeDropdown === link.name && (
                <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg p-5 grid grid-cols-3 gap-6 min-w-[600px] max-h-[400px] overflow-y-auto animate-fadeIn">
                  {link.submenu.map((section, i) => (
                    <div key={i}>
                      {section.category && (
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {section.category}
                        </h4>
                      )}
                      {section.items &&
                        section.items.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.href}
                            className="block text-sm text-gray-700 hover:bg-[#FF6F3C] hover:text-white px-2 py-1 rounded transition-colors"
                          >
                            {sub.name}
                          </Link>
                        ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* CTA */}
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

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
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
              <div key={link.name}>
                <Link
                  to={link.href}
                  className={`block text-base font-semibold transition-colors py-2.5 border-b border-gray-100 ${
                    location.pathname === link.href
                      ? "text-[#00B9B3]"
                      : "text-gray-700 hover:text-[#00B9B3]"
                  }`}
                  onClick={() => !link.submenu && setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>

                {/* Mobile Dropdown */}
                {link.submenu && (
                  <div className="pl-4 mt-2 space-y-1">
                    {link.submenu.map((section, i) => (
                      <div key={i}>
                        <p className="font-medium text-gray-800 mt-2">
                          {section.category}
                        </p>
                        {section.items.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.href}
                            className="block text-sm text-gray-600 hover:text-[#00B9B3] py-1"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

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

      {/* Overlay */}
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
