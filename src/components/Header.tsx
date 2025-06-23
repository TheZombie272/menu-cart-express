
import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CartItem } from "./CartItem";

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

interface HeaderProps {
  cart: CartProduct[];
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  handleWhatsAppOrder: () => void;
  deliveryCost: number;
}

export const Header = ({ cart, updateQuantity, removeFromCart, handleWhatsAppOrder, deliveryCost }: HeaderProps) => {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalPrice = subtotal + (cart.length > 0 ? deliveryCost : 0);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 restaurant-gradient rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <h1 className="text-xl font-bold text-gray-800">Restaurante Delicia</h1>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors hover:text-orange-600 ${
              location.pathname === '/' ? 'text-orange-600' : 'text-gray-700'
            }`}
          >
            Menú
          </Link>
          <Link 
            to="/sobre-nosotros" 
            className={`text-sm font-medium transition-colors hover:text-orange-600 ${
              location.pathname === '/sobre-nosotros' ? 'text-orange-600' : 'text-gray-700'
            }`}
          >
            Sobre Nosotros
          </Link>
        </nav>

        <div className="flex items-center space-x-2">
          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Navegación</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <Link 
                  to="/" 
                  className={`block text-lg font-medium transition-colors hover:text-orange-600 ${
                    location.pathname === '/' ? 'text-orange-600' : 'text-gray-700'
                  }`}
                >
                  Menú
                </Link>
                <Link 
                  to="/sobre-nosotros" 
                  className={`block text-lg font-medium transition-colors hover:text-orange-600 ${
                    location.pathname === '/sobre-nosotros' ? 'text-orange-600' : 'text-gray-700'
                  }`}
                >
                  Sobre Nosotros
                </Link>
              </div>
            </SheetContent>
          </Sheet>

          {/* Cart */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="relative">
                <ShoppingCart className="h-4 w-4" />
                {totalItems > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Carrito de Compras</SheetTitle>
                <SheetDescription>
                  Revisa tu pedido antes de continuar
                </SheetDescription>
              </SheetHeader>
              
              <div className="mt-6 space-y-4">
                {cart.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">Tu carrito está vacío</p>
                ) : (
                  <>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {cart.map((item) => (
                        <CartItem
                          key={item.id}
                          item={item}
                          updateQuantity={updateQuantity}
                          removeFromCart={removeFromCart}
                        />
                      ))}
                    </div>
                    
                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Subtotal:</span>
                        <span className="text-sm font-medium">
                          ${subtotal.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Domicilio:</span>
                        <span className="text-sm font-medium">
                          ${deliveryCost.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center border-t pt-2">
                        <span className="text-lg font-semibold">Total:</span>
                        <span className="text-xl font-bold text-orange-600">
                          ${totalPrice.toLocaleString()}
                        </span>
                      </div>
                      
                      <Button 
                        onClick={handleWhatsAppOrder}
                        className="w-full restaurant-gradient text-white hover:opacity-90 transition-opacity"
                        size="lg"
                      >
                        Finalizar Compra por WhatsApp
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
