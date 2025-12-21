import { ArrowRight, X, Menu, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";

interface CategoryProducts {
  indoorSaunas: ShopifyProduct[];
  outdoorSaunas: ShopifyProduct[];
  steamRooms: ShopifyProduct[];
  infraredSaunas: ShopifyProduct[];
  saunaHeaters: ShopifyProduct[];
  accessories: ShopifyProduct[];
}

const Navigation = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [categoryProducts, setCategoryProducts] = useState<CategoryProducts>({
    indoorSaunas: [],
    outdoorSaunas: [],
    steamRooms: [],
    infraredSaunas: [],
    saunaHeaters: [],
    accessories: []
  });
  const [isLoading, setIsLoading] = useState(false);

  // Fetch products when Shop dropdown is hovered
  useEffect(() => {
    if (activeDropdown === "Shop" && categoryProducts.indoorSaunas.length === 0) {
      loadCategoryProducts();
    }
  }, [activeDropdown]);

  const loadCategoryProducts = async () => {
    setIsLoading(true);
    try {
      const products = await fetchProducts(50);
      
      // Categorize products based on title, tags, or product type
      const categorized: CategoryProducts = {
        indoorSaunas: [],
        outdoorSaunas: [],
        steamRooms: [],
        infraredSaunas: [],
        saunaHeaters: [],
        accessories: []
      };

      products.forEach(product => {
        const title = product.node.title.toLowerCase();
        const productType = (product.node as any).productType?.toLowerCase() || '';
        
        // Categorize based on keywords in title or product type
        if (title.includes('indoor') || productType.includes('indoor')) {
          categorized.indoorSaunas.push(product);
        } else if (title.includes('outdoor') || title.includes('barrel') || productType.includes('outdoor')) {
          categorized.outdoorSaunas.push(product);
        } else if (title.includes('steam') || productType.includes('steam')) {
          categorized.steamRooms.push(product);
        } else if (title.includes('infrared') || title.includes('red light') || productType.includes('infrared')) {
          categorized.infraredSaunas.push(product);
        } else if (title.includes('heater') || productType.includes('heater')) {
          categorized.saunaHeaters.push(product);
        } else if (title.includes('accessory') || title.includes('accessories') || productType.includes('accessory')) {
          categorized.accessories.push(product);
        } else {
          // Default to indoor saunas if no category match
          categorized.indoorSaunas.push(product);
        }
      });

      setCategoryProducts(categorized);
    } catch (error) {
      console.error('Failed to load category products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const popularSearches = [
    "Barrel Saunas",
    "Steam Rooms",
    "Infrared Saunas",
    "Outdoor Saunas",
    "Sauna Heaters",
    "Accessories"
  ];

  const shopCategories = [
    { name: "Indoor Saunas", key: "indoorSaunas" as keyof CategoryProducts, href: "/category/indoor-saunas" },
    { name: "Outdoor Saunas", key: "outdoorSaunas" as keyof CategoryProducts, href: "/category/outdoor-saunas" },
    { name: "Steam Rooms", key: "steamRooms" as keyof CategoryProducts, href: "/category/steam-rooms" },
    { name: "Infrared Saunas", key: "infraredSaunas" as keyof CategoryProducts, href: "/category/infrared-saunas" },
    { name: "Sauna Heaters", key: "saunaHeaters" as keyof CategoryProducts, href: "/category/sauna-heaters" },
    { name: "Accessories", key: "accessories" as keyof CategoryProducts, href: "/category/accessories" }
  ];

  const aboutItems = [
    { name: "Our Story", href: "/about/our-story" },
    { name: "Sustainability", href: "/about/sustainability" },
    { name: "Installation Guide", href: "/about/installation-guide" },
    { name: "Customer Care", href: "/about/customer-care" },
    { name: "Showroom Locations", href: "/about/showroom-locations" }
  ];

  // Get featured products for the dropdown images (first 2 products that have images)
  const getFeaturedProducts = (): ShopifyProduct[] => {
    const allProducts = [
      ...categoryProducts.indoorSaunas,
      ...categoryProducts.outdoorSaunas,
      ...categoryProducts.steamRooms,
      ...categoryProducts.infraredSaunas,
      ...categoryProducts.saunaHeaters,
      ...categoryProducts.accessories
    ];
    
    return allProducts
      .filter(p => p.node.images?.edges?.[0]?.node?.url)
      .slice(0, 2);
  };

  const navItems = [
    { name: "Shop", href: "/category/shop" },
    { name: "About", href: "/about/our-story" }
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

      {/* Shop dropdown */}
      {activeDropdown === "Shop" && (
        <div 
          className="absolute top-full left-0 right-0 bg-background border-b border-border z-50 shadow-lg"
          onMouseEnter={() => setActiveDropdown("Shop")}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <div className="px-6 py-8 max-w-7xl mx-auto">
            <div className="flex justify-between w-full">
              {/* Left side - Categories with product counts */}
              <div className="flex-1">
                <ul className="space-y-2">
                  {shopCategories.map((category) => {
                    const productCount = categoryProducts[category.key].length;
                    return (
                      <li key={category.key}>
                        <Link 
                          to={category.href}
                          className="text-nav-foreground hover:text-nav-hover transition-colors duration-200 text-sm font-sans block py-2 flex items-center gap-2"
                        >
                          {category.name}
                          {!isLoading && productCount > 0 && (
                            <span className="text-xs text-muted-foreground">({productCount})</span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Right side - Featured product images */}
              <div className="hidden md:flex space-x-6">
                {isLoading ? (
                  <div className="flex items-center justify-center w-[300px] h-[200px] bg-secondary/20 rounded-lg">
                    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  getFeaturedProducts().map((product, index) => {
                    const image = product.node.images?.edges?.[0]?.node;
                    return (
                      <Link 
                        key={product.node.id} 
                        to={`/product/${product.node.handle}`} 
                        className="w-[300px] h-[200px] cursor-pointer group relative overflow-hidden rounded-lg block"
                      >
                        <img 
                          src={image?.url}
                          alt={image?.altText || product.node.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                        <div className="absolute bottom-3 left-3 text-background text-sm font-sans flex items-center gap-1">
                          <span>{product.node.title}</span>
                          <ArrowRight size={14} />
                        </div>
                      </Link>
                    );
                  })
                )}
                {!isLoading && getFeaturedProducts().length === 0 && (
                  <div className="flex items-center justify-center w-[300px] h-[200px] bg-secondary/20 rounded-lg">
                    <p className="text-muted-foreground text-sm">No products yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* About dropdown */}
      {activeDropdown === "About" && (
        <div 
          className="absolute top-full left-0 right-0 bg-background border-b border-border z-50 shadow-lg"
          onMouseEnter={() => setActiveDropdown("About")}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <div className="px-6 py-8 max-w-7xl mx-auto">
            <div className="flex justify-between w-full">
              {/* Left side - Menu items */}
              <div className="flex-1">
                <ul className="space-y-2">
                  {aboutItems.map((item) => (
                    <li key={item.name}>
                      <Link 
                        to={item.href}
                        className="text-nav-foreground hover:text-nav-hover transition-colors duration-200 text-sm font-sans block py-2"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
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
              {/* Shop section */}
              <div>
                <Link
                  to="/category/shop"
                  className="text-nav-foreground hover:text-nav-hover transition-colors duration-200 text-lg font-serif block py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Shop
                </Link>
                <div className="mt-3 pl-4 space-y-2">
                  {shopCategories.map((category) => (
                    <Link
                      key={category.key}
                      to={category.href}
                      className="text-muted-foreground hover:text-nav-hover text-sm font-sans block py-1"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* About section */}
              <div>
                <Link
                  to="/about/our-story"
                  className="text-nav-foreground hover:text-nav-hover transition-colors duration-200 text-lg font-serif block py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <div className="mt-3 pl-4 space-y-2">
                  {aboutItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="text-muted-foreground hover:text-nav-hover text-sm font-sans block py-1"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
