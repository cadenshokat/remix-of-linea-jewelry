import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductDescription = () => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCareOpen, setIsCareOpen] = useState(false);
  const [isShippingOpen, setIsShippingOpen] = useState(false);

  return (
    <div className="space-y-0 mt-8 border-t border-border">
      {/* Product Details */}
      <div className="border-b border-border">
        <Button
          variant="ghost"
          onClick={() => setIsDetailsOpen(!isDetailsOpen)}
          className="w-full h-14 px-0 justify-between hover:bg-transparent font-light rounded-none"
        >
          <span>Product Details</span>
          {isDetailsOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
        {isDetailsOpen && (
          <div className="pb-6 space-y-3">
            <div className="flex justify-between">
              <span className="text-sm font-light text-muted-foreground">Material</span>
              <span className="text-sm font-light text-foreground">Premium Cedar Wood</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-light text-muted-foreground">Construction</span>
              <span className="text-sm font-light text-foreground">Tongue & Groove</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-light text-muted-foreground">Heating System</span>
              <span className="text-sm font-light text-foreground">Included</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-light text-muted-foreground">Warranty</span>
              <span className="text-sm font-light text-foreground">Lifetime</span>
            </div>
          </div>
        )}
      </div>

      {/* Care Instructions */}
      <div className="border-b border-border">
        <Button
          variant="ghost"
          onClick={() => setIsCareOpen(!isCareOpen)}
          className="w-full h-14 px-0 justify-between hover:bg-transparent font-light rounded-none"
        >
          <span>Care & Maintenance</span>
          {isCareOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
        {isCareOpen && (
          <div className="pb-6 space-y-4">
            <ul className="space-y-2">
              <li className="text-sm font-light text-muted-foreground">• Allow proper ventilation after each use</li>
              <li className="text-sm font-light text-muted-foreground">• Wipe down benches with a damp cloth weekly</li>
              <li className="text-sm font-light text-muted-foreground">• Apply wood treatment oil annually</li>
              <li className="text-sm font-light text-muted-foreground">• Check heater elements periodically</li>
            </ul>
            <p className="text-sm font-light text-muted-foreground">
              For detailed maintenance instructions, refer to the owner's manual or contact our support team.
            </p>
          </div>
        )}
      </div>

      {/* Shipping & Installation */}
      <div className="border-b border-border lg:mb-16">
        <Button
          variant="ghost"
          onClick={() => setIsShippingOpen(!isShippingOpen)}
          className="w-full h-14 px-0 justify-between hover:bg-transparent font-light rounded-none"
        >
          <span>Shipping & Installation</span>
          {isShippingOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
        {isShippingOpen && (
          <div className="pb-6 space-y-4">
            <p className="text-sm font-light text-muted-foreground">
              Free white-glove delivery is included with every sauna purchase. Our team will contact you within 2-3 business days to schedule delivery and installation.
            </p>
            <ul className="space-y-2">
              <li className="text-sm font-light text-muted-foreground">• Delivery within 4-6 weeks</li>
              <li className="text-sm font-light text-muted-foreground">• Professional installation included</li>
              <li className="text-sm font-light text-muted-foreground">• Site inspection available upon request</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDescription;