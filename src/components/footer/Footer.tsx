import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-accent text-accent-foreground pt-16 pb-4 px-6 mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Brand - Left side */}
          <div>
            <Link to="/" className="block mb-6">
              <span className="font-serif text-3xl font-medium tracking-tight">
                SAUNA
              </span>
            </Link>
            <p className="text-sm font-sans text-accent-foreground/80 leading-relaxed max-w-md mb-8">
              Premium saunas, steam rooms, and wellness products crafted for the modern home. Experience the art of relaxation.
            </p>
            
            {/* Contact Information */}
            <div className="space-y-4 text-sm font-sans text-accent-foreground/80">
              <div>
                <p className="font-medium text-accent-foreground mb-1">Showroom</p>
                <p>123 Wellness Boulevard</p>
                <p>Los Angeles, CA 90210</p>
              </div>
              <div>
                <p className="font-medium text-accent-foreground mb-1 mt-4">Contact</p>
                <p>1-800-SAUNA-CO</p>
                <p>hello@sauna.com</p>
              </div>
            </div>
          </div>

          {/* Link lists - Right side */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Shop */}
            <div>
              <h4 className="text-sm font-sans font-medium mb-4 uppercase tracking-wide">Shop</h4>
              <ul className="space-y-3">
                <li><Link to="/category/indoor-saunas" className="text-sm font-sans text-accent-foreground/80 hover:text-accent-foreground transition-colors">Indoor Saunas</Link></li>
                <li><Link to="/category/outdoor-saunas" className="text-sm font-sans text-accent-foreground/80 hover:text-accent-foreground transition-colors">Outdoor Saunas</Link></li>
                <li><Link to="/category/steam-rooms" className="text-sm font-sans text-accent-foreground/80 hover:text-accent-foreground transition-colors">Steam Rooms</Link></li>
                <li><Link to="/category/infrared-saunas" className="text-sm font-sans text-accent-foreground/80 hover:text-accent-foreground transition-colors">Infrared Saunas</Link></li>
                <li><Link to="/category/accessories" className="text-sm font-sans text-accent-foreground/80 hover:text-accent-foreground transition-colors">Accessories</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-sm font-sans font-medium mb-4 uppercase tracking-wide">Support</h4>
              <ul className="space-y-3">
                <li><Link to="/about/installation-guide" className="text-sm font-sans text-accent-foreground/80 hover:text-accent-foreground transition-colors">Installation Guide</Link></li>
                <li><Link to="/about/size-guide" className="text-sm font-sans text-accent-foreground/80 hover:text-accent-foreground transition-colors">Size Guide</Link></li>
                <li><Link to="/about/customer-care" className="text-sm font-sans text-accent-foreground/80 hover:text-accent-foreground transition-colors">Customer Care</Link></li>
                <li><Link to="/about/store-locator" className="text-sm font-sans text-accent-foreground/80 hover:text-accent-foreground transition-colors">Showrooms</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-sm font-sans font-medium mb-4 uppercase tracking-wide">Company</h4>
              <ul className="space-y-3">
                <li><Link to="/about/our-story" className="text-sm font-sans text-accent-foreground/80 hover:text-accent-foreground transition-colors">Our Story</Link></li>
                <li><Link to="/about/sustainability" className="text-sm font-sans text-accent-foreground/80 hover:text-accent-foreground transition-colors">Sustainability</Link></li>
                <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-sm font-sans text-accent-foreground/80 hover:text-accent-foreground transition-colors">Instagram</a></li>
                <li><a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="text-sm font-sans text-accent-foreground/80 hover:text-accent-foreground transition-colors">Pinterest</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="border-t border-accent-foreground/20 pt-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm font-sans text-accent-foreground/70">
            © 2024 Sauna.com. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="text-sm font-sans text-accent-foreground/70 hover:text-accent-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-sm font-sans text-accent-foreground/70 hover:text-accent-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;