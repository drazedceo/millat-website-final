<header
  className={`sticky top-0 z-50 h-20 transition-all duration-300 ${
    isScrolled ? 'bg-white shadow-lg' : 'bg-white shadow-sm'
  }`}
>
  {/* Removed max-w-7xl, replaced with w-full for full stretch */}
  <div className="w-full px-6 lg:px-10 h-full flex items-center justify-between">
    
    {/* Logo - slightly smaller for zoom-out effect */}
    <Link to="/">
      <img
        src="/images/logo.png"
        alt="Millat Polymer Logo"
        className="w-28 lg:w-32 object-contain"
      />
    </Link>

    {/* Desktop Navigation */}
    <nav className="hidden lg:flex items-center gap-x-6 text-gray-800 font-medium text-sm tracking-wide">
      {navigationLinks.map((link) => (
        <div key={link.name} className="relative group">
          {link.dropdown ? (
            <>
              <button
                className={`relative px-2 py-1.5 whitespace-nowrap transition-all duration-200 flex items-center ${
                  location.pathname === link.href || link.dropdown.some(item => location.pathname === item.href)
                    ? 'text-[#00B9B3] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#00B9B3]'
                    : 'hover:text-[#00B9B3]'
                }`}
              >
                {link.name}
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-60 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-[#00B9B3] transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <Link
              to={link.href}
              className={`relative px-2 py-1.5 whitespace-nowrap transition-all duration-200 ${
                location.pathname === link.href
                  ? 'text-[#00B9B3] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#00B9B3]'
                  : 'hover:text-[#00B9B3]'
              }`}
            >
              {link.name}
            </Link>
          )}
        </div>
      ))}
    </nav>

    {/* CTA Button - scaled down */}
    <Link
      to="/contact"
      className="hidden lg:inline-block bg-[#FF6F3C] text-white px-4 py-2.5 rounded-full shadow-md hover:bg-opacity-90 transition-all duration-200 font-semibold text-sm"
    >
      get in<br />touch
    </Link>

    {/* Mobile menu toggle remains unchanged */}
    ...
  </div>
</header>
 