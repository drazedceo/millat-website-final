import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const navLinks = [
    { name: "Home", href: "/" },
    {
      name: "Company", // Changed from About Us
      href: "/about",
      submenu: [
        { name: "Our Story", href: "/about/story" },
        { name: "Vision, Mission & Values", href: "/about/vision" },
        { name: "Leadership Team", href: "/about/leadership" },
        { name: "CSR Initiatives", href: "/about/csr" },
        { name: "Achievements & Awards", href: "/about/awards" },
      ],
    },
    {
      name: "Manufacturing",
      href: "/manufacturing",
      submenu: [
        { name: "Manufacturing Facilities", href: "/manufacturing/facilities" },
        { name: "Production Processes", href: "/manufacturing/processes" },
        { name: "Quality Control & Testing", href: "/manufacturing/quality" },
        { name: "In-House Tooling & Moulding", href: "/manufacturing/tooling" },
        { name: "Material Compounding", href: "/manufacturing/compounding" },
        { name: "R&D & Innovation", href: "/manufacturing/innovation" },
      ],
    },
    {
      name: "Capabilities",
      href: "/capabilities",
      submenu: [
        { name: "In-House Compounding", href: "/capabilities/compounding" },
        { name: "Technical Expertise", href: "/capabilities/expertise" },
        { name: "Testing & Quality Assurance", href: "/capabilities/testing" },
        { name: "Product Customization", href: "/capabilities/customization" },
        { name: "Large-Scale Production", href: "/capabilities/production" },
        { name: "Prototype Development", href: "/capabilities/prototype" },
        { name: "Supply Chain & Logistics", href: "/capabilities/logistics" },
      ],
    },
    {
      name: "Compliance",
      href: "/compliance",
      submenu: [
        { name: "Quality Management System", href: "/compliance/qms" },
        { name: "Environmental Standards", href: "/compliance/environment" },
        { name: "Occupational Health & Safety", href: "/compliance/ohs" },
        { name: "Material Compliance", href: "/compliance/material" },
        { name: "Safety & Quality Standards", href: "/compliance/standards" },
        { name: "Industry Approvals", href: "/compliance/approvals" },
      ],
    },
    { name: "Certifications", href: "/certifications" },
    { name: "Products", href: "/products" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img
            src="/images/logo.png"
            alt="Millat Polymer"
            className="w-36 object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative group"
              onMouseEnter={() => setActiveDropdown(link.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to={link.href}
                className={`flex items-center gap-1 px-3 py-2 font-medium transition-colors duration-200 rounded-md
                  ${
                    location.pathname === link.href
                      ? "bg-[#FF6F3C] text-white"
                      : "text-gray-800 hover:bg-[#FF6F3C] hover:text-white"
                  }`}
              >
                {link.name}
                {link.submenu && (
                  <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                )}
              </Link>

              {/* Dropdown Menu */}
              {link.submenu && activeDropdown === link.name && (
                <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg p-5 grid grid-cols-2 gap-4 min-w-[400px] animate-fadeIn">
                  {link.submenu.map((sub) => (
                    <Link
                      key={sub.name}
                      to={sub.href}
                      className="text-sm text-gray-700 hover:bg-[#FF6F3C] hover:text-white px-2 py-1 rounded transition-colors"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* CTA Button */}
        <Link
          to="/contact"
          className="hidden lg:inline-block bg-[#FF6F3C] text-white px-6 py-3 rounded-full shadow-md hover:bg-opacity-90 transition-all font-semibold"
        >
          Get in Touch
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-gray-700 hover:text-[#00B9B3]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 z-50 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <img src="/images/logo.png" alt="Millat Polymer" className="w-32" />
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 text-gray-700 hover:text-[#00B9B3]"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable menu for mobile */}
        <div className="p-4 overflow-y-auto space-y-4 max-h-[calc(100vh-80px)]">
          {navLinks.map((link) => (
            <div key={link.name}>
              <div
                className="flex justify-between items-center py-2 border-b text-gray-800 font-semibold cursor-pointer hover:bg-[#FF6F3C] hover:text-white rounded-md px-2"
                onClick={() =>
                  setActiveDropdown(
                    activeDropdown === link.name ? null : link.name
                  )
                }
              >
                {link.name}
                {link.submenu && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      activeDropdown === link.name ? "rotate-180" : ""
                    }`}
                  />
                )}
              </div>
              {link.submenu && activeDropdown === link.name && (
                <div className="pl-4 space-y-2 py-2">
                  {link.submenu.map((sub) => (
                    <Link
                      key={sub.name}
                      to={sub.href}
                      className="block text-sm text-gray-600 hover:bg-[#FF6F3C] hover:text-white px-2 py-1 rounded"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            to="/contact"
            className="block bg-[#FF6F3C] text-white px-5 py-3 rounded-full shadow-md hover:bg-opacity-90 transition-all text-center font-semibold"
            onClick={() => setIsMenuOpen(false)}
          >
            Get in Touch
          </Link>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
