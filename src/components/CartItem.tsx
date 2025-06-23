
import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

interface CartProduct extends Product {
  quantity: number;
}

interface CartItemProps {
  item: CartProduct;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
}

export const CartItem = ({ item, updateQuantity, removeFromCart }: CartItemProps) => {
  return (
    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
      <img 
        src={`https://images.unsplash.com/${item.image}`}
        alt={item.name}
        className="w-12 h-12 object-cover rounded-md flex-shrink-0"
      />
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-medium text-sm text-gray-900 truncate pr-2">{item.name}</h4>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-red-500 hover:text-red-700 flex-shrink-0"
            onClick={() => removeFromCart(item.id)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
        
        <p className="text-sm text-orange-600 font-semibold mb-2">
          ${item.price.toLocaleString()}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-6 w-6"
              onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
            >
              <Minus className="h-3 w-3" />
            </Button>
            
            <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
            
            <Button
              variant="outline"
              size="icon"
              className="h-6 w-6"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">
              ${(item.price * item.quantity).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
