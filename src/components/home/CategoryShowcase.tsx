import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import outdoorSauna from "@/assets/outdoor-sauna.jpg";
import steamRoom from "@/assets/steam-room.jpg";
import { track } from "@/lib/analytics";

const CategoryShowcase = () => {
  const categories = [
    {
      title: "Outdoor Saunas",
      description: "Experience nature's embrace with our handcrafted outdoor barrel and cabin saunas",
      image: outdoorSauna,
      link: "/category/outdoor-saunas",
      category_key: "outdoor-saunas",
    },
    {
      title: "Steam Rooms",
      description: "Modern steam rooms designed for ultimate relaxation and rejuvenation",
      image: steamRoom,
      link: "/category/steam-rooms",
      category_key: "steam-rooms",
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Explore Our Collections</h2>
          <p className="text-muted-foreground font-sans max-w-2xl mx-auto">
            From traditional Finnish saunas to modern steam rooms, find the perfect addition to your wellness routine.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={category.link}
              onClick={() =>
                track("Category Clicked", {
                  category: category.title,
                  category_key: category.category_key,
                  destination: category.link,
                  position: index + 1,
                  source: "CategoryShowcase",
                })
              }              
              className="group relative aspect-[4/3] overflow-hidden rounded-lg"
            >
              <img 
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h3 className="font-serif text-2xl md:text-3xl text-background mb-2">{category.title}</h3>
                <p className="font-sans text-background/80 text-sm md:text-base mb-4">{category.description}</p>
                <span className="inline-flex items-center font-sans text-sm text-background group-hover:text-primary-foreground transition-colors">
                  Shop Now
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;