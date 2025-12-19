import { Truck, Shield, Leaf, Phone } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "White Glove Delivery",
    description: "Professional installation included with every sauna purchase"
  },
  {
    icon: Shield,
    title: "Lifetime Warranty",
    description: "Quality craftsmanship backed by our comprehensive warranty"
  },
  {
    icon: Leaf,
    title: "Sustainably Sourced",
    description: "Premium cedar and hemlock from certified sustainable forests"
  },
  {
    icon: Phone,
    title: "Expert Support",
    description: "Dedicated wellness consultants available 7 days a week"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 px-6 bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">The Sauna.com Difference</h2>
          <p className="text-muted-foreground font-sans max-w-2xl mx-auto">
            More than just products — we deliver a complete wellness experience from selection to installation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg mb-2">{feature.title}</h3>
              <p className="font-sans text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;