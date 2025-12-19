import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import HeroSection from "../components/home/HeroSection";
import CategoryShowcase from "../components/home/CategoryShowcase";
import { ProductGrid } from "../components/products/ProductGrid";
import FeaturesSection from "../components/home/FeaturesSection";
import WellnessSection from "../components/home/WellnessSection";

const Index = () => {
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