import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import saunaHero from "@/assets/sauna-hero.jpg";

const WellnessSection = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative aspect-square lg:aspect-[4/5] rounded-lg overflow-hidden">
            <img 
              src={saunaHero}
              alt="Wellness sauna experience"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Content */}
          <div className="lg:pl-8">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight">
              Elevate Your <br />Daily Wellness
            </h2>
            <p className="font-sans text-muted-foreground text-lg mb-6 leading-relaxed">
              A sauna isn't just an addition to your home — it's an investment in your health. From improved cardiovascular function to deeper sleep and stress relief, the benefits of regular sauna use are backed by science.
            </p>
            <ul className="font-sans space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                <span>Promotes muscle recovery and reduces inflammation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                <span>Supports cardiovascular health and circulation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                <span>Enhances mental clarity and reduces stress</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                <span>Improves skin health through deep cleansing</span>
              </li>
            </ul>
            <Button asChild size="lg" className="font-sans">
              <Link to="/about/our-story">
                Learn More
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WellnessSection;