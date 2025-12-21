import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import saunaHero from "@/assets/sauna-hero.jpg";
import { track } from "@/lib/analytics";

const HeroSection = () => {
  return (
    <section className="relative w-full h-[85vh] min-h-[600px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={saunaHero}
          alt="Luxury sauna interior with warm wood and steam"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-background mb-6 leading-tight animate-fade-in-up">
              The Art of <br />Relaxation
            </h1>
            <p className="font-sans text-background/90 text-lg md:text-xl mb-8 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Premium saunas and steam rooms crafted with Scandinavian precision. Transform your home into a wellness sanctuary.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <Button asChild size="lg" className="font-sans">
              <Link
                  to="/category/shop"
                  onClick={() =>
                    track("CTA Clicked", {
                      location: "Hero",
                      cta_text: "Shop Collection",
                      destination: "/category/shop",
                    })
                  }
                >
                  Shop Collection
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-sans bg-background/10 border-background/30 text-background hover:bg-background/20">
              <Link
                  to="/about/our-story"
                  onClick={() =>
                    track("CTA Clicked", {
                      location: "Hero",
                      cta_text: "Our Story",
                      destination: "/about/our-story",
                    })
                  }
                >
                  Our Story
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;