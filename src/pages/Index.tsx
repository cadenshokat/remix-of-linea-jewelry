import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import HeroSection from "../components/home/HeroSection";
import CategoryShowcase from "../components/home/CategoryShowcase";
import { ProductGrid } from "../components/products/ProductGrid";
import FeaturesSection from "../components/home/FeaturesSection";
import WellnessSection from "../components/home/WellnessSection";
import { useEffect } from "react";
import { page, track } from "@/lib/analytics";

const Index = () => {
  useEffect(() => {
    page({ name: "Home" });
    track("Home Viewed");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <HeroSection />
        <CategoryShowcase />
        <ProductGrid 
          title="Shop Our Collection"
          description="Premium saunas and steam rooms designed for your home wellness sanctuary"
        />
        <FeaturesSection />
        <WellnessSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;