import { ArrowRight, X, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartDrawer } from "@/components/cart/CartDrawer";
import outdoorSauna from "@/assets/outdoor-sauna.jpg";
import steamRoom from "@/assets/steam-room.jpg";

const Navigation = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const popularSearches = [
    "Barrel Saunas",
    "Steam Rooms",
    "Infrared Saunas",
    "Outdoor Saunas",
    "Sauna Heaters",
    "Accessories"
  ];
  
  const navItems = [
    { 
      name: "Shop", 
      href: "/category/shop",
      submenuItems: [
        "Indoor Saunas",
        "Outdoor Saunas",
        "Steam Rooms",
        "Infrared Saunas",
        "Sauna Heaters",
        "Accessories"
      ],
      images: [
        { src: outdoorSauna, alt: "Outdoor Sauna Collection", label: "Outdoor Saunas" },
        { src: steamRoom, alt: "Steam Room Collection", label: "Steam Rooms" }
      ]
    },
    { 
      name: "Collections", 
      href: "/category/new-in",
      submenuItems: [
        "New Arrivals",
        "Best Sellers",
        "Premium Series",
        "Compact Saunas",
        "Commercial Grade"
      ],
      images: [
        { src: outdoorSauna, alt: "Barrel Sauna", label: "Barrel Saunas" },
        { src: steamRoom, alt: "Modern Steam Room", label: "Steam Rooms" }
      ]
    },
    { 
      name: "About", 
      href: "/about/our-story",
      submenuItems: [
        "Our Story",
        "Sustainability",
        "Installation Guide",
        "Customer Care",
        "Showroom Locations"
      ],
      images: [
        { src: outdoorSauna, alt: "Sauna Craftsmanship", label: "Our Craftsmanship" }
      ]
    }
  ];

  return (
    <nav 
      className="relative bg-background/95 backdrop-blur-md border-b border-border"
    >
      <div className="flex items-center justify-between h-20 px-6 max-w-7xl mx-auto">
        {/* Mobile hamburger button */}
        <button
          className="lg:hidden p-2 text-nav-foreground hover:text-nav-hover transition-colors duration-200"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Left navigation - Hidden on tablets and mobile */}
        <div className="hidden lg:flex space-x-8">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to={item.href}
                className="text-nav-foreground hover:text-nav-hover transition-colors duration-200 text-sm font-sans tracking-wide uppercase py-8 block"
              >
                {item.name}
              </Link>
            </div>
          ))}
        </div>

        {/* Center logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link to="/" className="block">
            <span className="font-serif text-2xl md:text-3xl font-medium tracking-tight text-foreground">
              SAUNA
            </span>
          </Link>
        </div>

        {/* Right icons */}
        <div className="flex items-center space-x-2">
          <button 
            className="p-2 text-nav-foreground hover:text-nav-hover transition-colors duration-200"
            aria-label="Search"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
          <CartDrawer />
        </div>
      </div>

      {/* Full width dropdown */}
      {activeDropdown && (
        <div 
          className="absolute top-full left-0 right-0 bg-background border-b border-border z-50 shadow-lg"
          onMouseEnter={() => setActiveDropdown(activeDropdown)}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <div className="px-6 py-8 max-w-7xl mx-auto">
            <div className="flex justify-between w-full">
              {/* Left side - Menu items */}
              <div className="flex-1">
                <ul className="space-y-2">
                   {navItems
                     .find(item => item.name === activeDropdown)
                     ?.submenuItems.map((subItem, index) => (
                      <li key={index}>
                        <Link 
                          to={activeDropdown === "About" ? `/about/${subItem.toLowerCase().replace(/\s+/g, '-')}` : `/category/${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                          className="text-nav-foreground hover:text-nav-hover transition-colors duration-200 text-sm font-sans block py-2"
                        >
                          {subItem}
                        </Link>
                      </li>
                   ))}
                </ul>
              </div>

              {/* Right side - Images */}
              <div className="hidden md:flex space-x-6">
                {navItems
                  .find(item => item.name === activeDropdown)
                  ?.images.map((image, index) => {
                    let linkTo = "/category/shop";
                    
                    return (
                      <Link key={index} to={linkTo} className="w-[300px] h-[200px] cursor-pointer group relative overflow-hidden rounded-lg block">
                        <img 
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                        <div className="absolute bottom-3 left-3 text-background text-sm font-sans flex items-center gap-1">
                          <span>{image.label}</span>
                          <ArrowRight size={14} />
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search overlay */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b border-border z-50 shadow-lg">
          <div className="px-6 py-8 max-w-2xl mx-auto">
            {/* Search input */}
            <div className="relative mb-8">
              <div className="flex items-center border-b border-border pb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-nav-foreground mr-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search for saunas, steam rooms..."
                  className="flex-1 bg-transparent text-nav-foreground placeholder:text-muted-foreground outline-none text-lg font-sans"
                  autoFocus
                />
                <button onClick={() => setIsSearchOpen(false)} className="p-2">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Popular searches */}
            <div>
              <h3 className="text-nav-foreground text-sm font-sans mb-4 uppercase tracking-wide">Popular Searches</h3>
              <div className="flex flex-wrap gap-3">
                {popularSearches.map((search, index) => (
                  <button
                    key={index}
                    className="text-nav-foreground hover:text-nav-hover text-sm font-sans py-2 px-4 border border-border rounded-full transition-colors duration-200 hover:border-nav-hover hover:bg-secondary/50"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile navigation menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border z-50 shadow-lg">
          <div className="px-6 py-8">
            <div className="space-y-6">
              {navItems.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.href}
                    className="text-nav-foreground hover:text-nav-hover transition-colors duration-200 text-lg font-serif block py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                   <div className="mt-3 pl-4 space-y-2">
                     {item.submenuItems.map((subItem, subIndex) => (
                       <Link
                         key={subIndex}
                         to={item.name === "About" ? `/about/${subItem.toLowerCase().replace(/\s+/g, '-')}` : `/category/${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                         className="text-muted-foreground hover:text-nav-hover text-sm font-sans block py-1"
                         onClick={() => setIsMobileMenuOpen(false)}
                       >
                         {subItem}
                       </Link>
                     ))}
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;