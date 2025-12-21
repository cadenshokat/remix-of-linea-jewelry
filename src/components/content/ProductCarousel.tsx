import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { Loader2 } from "lucide-react";

interface ProductCarouselProps {
  query?: string;
  limit?: number;
  excludeHandle?: string;
}

const ProductCarousel = ({ query, limit = 6, excludeHandle }: ProductCarouselProps) => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const fetchedProducts = await fetchProducts(limit + 1, query);
        // Filter out the current product if excludeHandle is provided
        const filteredProducts = excludeHandle 
          ? fetchedProducts.filter(p => p.node.handle !== excludeHandle)
          : fetchedProducts;
        setProducts(filteredProducts.slice(0, limit));
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [query, limit, excludeHandle]);

  if (isLoading) {
    return (
      <section className="w-full mb-16 px-6">
        <div className="flex items-center justify-center py-10">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="w-full mb-16 px-6">
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent>
          {products.map((product) => {
            const price = product.node.priceRange.minVariantPrice;
            const image = product.node.images.edges[0]?.node;
            
            return (
              <CarouselItem
                key={product.node.id}
                className="basis-1/2 md:basis-1/3 lg:basis-1/4 pr-2 md:pr-4"
              >
                <Link to={`/product/${product.node.handle}`}>
                  <Card className="border-none shadow-none bg-transparent group">
                    <CardContent className="p-0">
                      <div className="aspect-square mb-3 overflow-hidden bg-muted/10 relative">
                        {image ? (
                          <img
                            src={image.url}
                            alt={image.altText || product.node.title}
                            className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-secondary flex items-center justify-center">
                            <span className="text-muted-foreground text-sm">No image</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/[0.03]"></div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-light text-muted-foreground">
                          {product.node.productType || 'Sauna'}
                        </p>
                        <div className="flex justify-between items-center">
                          <h3 className="text-sm font-medium text-foreground truncate">
                            {product.node.title}
                          </h3>
                          <p className="text-sm font-light text-foreground">
                            ${parseFloat(price.amount).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default ProductCarousel;