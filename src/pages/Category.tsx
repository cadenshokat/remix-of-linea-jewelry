import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import CategoryHeader from "../components/category/CategoryHeader";
import FilterSortBar from "../components/category/FilterSortBar";
import ProductGrid from "../components/category/ProductGrid";
import { fetchProducts } from "@/lib/shopify";

const Category = () => {
  const { category } = useParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const loadCount = async () => {
      try {
        // Build query based on category
        let query: string | undefined;
        if (category && category !== 'shop') {
          const categoryMap: Record<string, string> = {
            'indoor-saunas': 'product_type:indoor OR title:indoor',
            'outdoor-saunas': 'product_type:outdoor OR title:outdoor OR title:barrel',
            'steam-rooms': 'product_type:steam OR title:steam',
            'infrared-saunas': 'product_type:infrared OR title:infrared',
            'sauna-heaters': 'product_type:heater OR title:heater',
            'accessories': 'product_type:accessories OR product_type:accessory',
          };
          query = categoryMap[category];
        }
        
        const products = await fetchProducts(100, query);
        setItemCount(products.length);
      } catch (error) {
        console.error('Error loading product count:', error);
      }
    };

    loadCount();
  }, [category]);

  // Format category name for display
  const formatCategoryName = (cat: string) => {
    return cat
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-6">
        <CategoryHeader 
          category={category ? formatCategoryName(category) : 'All Products'} 
        />
        
        <FilterSortBar 
          filtersOpen={filtersOpen}
          setFiltersOpen={setFiltersOpen}
          itemCount={itemCount}
        />
        
        <ProductGrid />
      </main>
      
      <Footer />
    </div>
  );
};

export default Category;