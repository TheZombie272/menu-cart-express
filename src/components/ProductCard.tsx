
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

export const ProductCard = ({ product, addToCart }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden card-hover group cursor-pointer">
      <div className="aspect-square overflow-hidden">
        <img 
          src={`https://images.unsplash.com/${product.image}`}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
            {product.name}
          </h3>
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-orange-600">
            ${product.price.toLocaleString()}
          </span>
          
          <Button 
            onClick={() => addToCart(product)}
            className="restaurant-gradient text-white hover:opacity-90 transition-opacity"
            size="sm"
          >
            Agregar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
