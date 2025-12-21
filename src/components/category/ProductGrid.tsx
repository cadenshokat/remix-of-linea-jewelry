import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useParams } from "react-router-dom";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { track } from "@/lib/analytics";

const ProductGrid = () => {
  const { category } = useParams();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  const listTrackedRef = useRef<string>("");

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      track("Collection Viewed", {
        collection_slug: category || "shop",
        collection_source: "ProductGrid",
      });
      try {
        // Build query based on category
        let query: string | undefined;
        if (category && category !== 'shop') {
          // Convert category slug to search query
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
        
        const fetchedProducts = await fetchProducts(50, query);
        setProducts(fetchedProducts);

        const key = `${category || "shop"}:${fetchedProducts.map(p => p.node.id).join(",")}`;
        if (listTrackedRef.current !== key) {
          listTrackedRef.current = key;

          track("Product List Viewed", {
            list_name: `Category:${category || "shop"}`,
            collection_slug: category || "shop",
            query_used: query || undefined,
            product_count: fetchedProducts.length,
            products: fetchedProducts.slice(0, 50).map((p, idx) => {
              const v = p.node.variants.edges[0]?.node;
              return {
                position: idx + 1,
                product_id: p.node.id,
                handle: p.node.handle,
                title: p.node.title,
                product_type: p.node.productType,
                variant_id: v?.id,
                price: v?.price?.amount ? parseFloat(v.price.amount) : undefined,
                currency: v?.price?.currencyCode,
              };
            }),
          });
        }
      } catch (error) {
        console.error("Error loading products:", error);
        track("Product List Load Failed", {
          collection_slug: category || "shop",
          error_message: (error as any)?.message || String(error),
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [category]);

  const handleAddToCart = (e: React.MouseEvent, product: ShopifyProduct) => {
    e.preventDefault();
    e.stopPropagation();
    
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;

    addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });

    track("Add to Cart", {
      product_id: product.node.id,
      handle: product.node.handle,
      title: product.node.title,
      product_type: product.node.productType,
      variant_id: variant.id,
      variant_title: variant.title,
      price: parseFloat(variant.price.amount),
      currency: variant.price.currencyCode,
      quantity: 1,
      selected_options: (variant.selectedOptions || []).map(o => ({ name: o.name, value: o.value })),
      source: "ProductGrid",
      collection_slug: category || "shop",
    });

    toast.success("Added to cart", {
      description: product.node.title,
      position: "top-center",
    });
  };

  if (isLoading) {
    return (
      <section className="w-full px-6 mb-16">
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="w-full px-6 mb-16">
        <div className="text-center py-20">
          <p className="text-muted-foreground font-sans">No products found in this category.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full px-6 mb-16">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product, idx) => {
          const price = product.node.priceRange.minVariantPrice;
          const image = product.node.images.edges[0]?.node;
          
          return (
            <Link
              key={product.node.id}
              to={`/product/${product.node.handle}`}
              onClick={() => {
                const v = product.node.variants.edges[0]?.node;
                track("Product Clicked", {
                  product_id: product.node.id,
                  handle: product.node.handle,
                  title: product.node.title,
                  product_type: product.node.productType,
                  position: idx + 1,
                  list_name: `Category:${category || "shop"}`,
                  collection_slug: category || "shop",
                  price: price?.amount ? parseFloat(price.amount) : undefined,
                  currency: price?.currencyCode,
                  variant_id: v?.id,
                });
              }}
            >
              <Card className="border-none shadow-none bg-transparent group cursor-pointer">
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
                        <span className="text-muted-foreground">No image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/[0.03]"></div>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => handleAddToCart(e, product)}
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-light text-muted-foreground truncate">
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
          );
        })}
      </div>
    </section>
  );
};

export default ProductGrid;