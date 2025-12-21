import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import { Minus, Plus } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { ShopifyProduct } from "@/lib/shopify";
import { toast } from "sonner";

interface ProductInfoProps {
  product: ShopifyProduct;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const addItem = useCartStore((state) => state.addItem);

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  const selectedVariant = product.node.variants.edges[selectedVariantIndex]?.node;
  const price = selectedVariant?.price || product.node.priceRange.minVariantPrice;
  const productType = product.node.productType || 'Sauna';

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    addItem({
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions || [],
    });

    toast.success("Added to cart", {
      description: `${quantity}x ${product.node.title}`,
      position: "top-center",
    });
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb - Show only on desktop */}
      <div className="hidden lg:block">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/category/shop">Shop</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.node.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Product title and price */}
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-light text-muted-foreground mb-1">{productType}</p>
            <h1 className="text-2xl md:text-3xl font-light text-foreground">{product.node.title}</h1>
          </div>
          <div className="text-right">
            <p className="text-xl font-light text-foreground">
              ${parseFloat(price.amount).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Variant selection */}
      {product.node.variants.edges.length > 1 && (
        <div className="space-y-4 py-4 border-b border-border">
          <h3 className="text-sm font-light text-foreground">Options</h3>
          <div className="flex flex-wrap gap-2">
            {product.node.variants.edges.map((variant, index) => (
              <Button
                key={variant.node.id}
                variant={selectedVariantIndex === index ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedVariantIndex(index)}
                className="rounded-none"
              >
                {variant.node.title}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Product description */}
      {product.node.description && (
        <div className="space-y-2 py-4 border-b border-border">
          <h3 className="text-sm font-light text-foreground">Description</h3>
          <p className="text-sm font-light text-muted-foreground">{product.node.description}</p>
        </div>
      )}

      {/* Quantity and Add to Cart */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="text-sm font-light text-foreground">Quantity</span>
          <div className="flex items-center border border-border">
            <Button
              variant="ghost"
              size="sm"
              onClick={decrementQuantity}
              className="h-10 w-10 p-0 hover:bg-transparent hover:opacity-50 rounded-none border-none"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="h-10 flex items-center px-4 text-sm font-light min-w-12 justify-center border-l border-r border-border">
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={incrementQuantity}
              className="h-10 w-10 p-0 hover:bg-transparent hover:opacity-50 rounded-none border-none"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Button 
          onClick={handleAddToCart}
          disabled={!selectedVariant?.availableForSale}
          className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 font-light rounded-none"
        >
          {selectedVariant?.availableForSale ? 'Add to Bag' : 'Out of Stock'}
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;