
import { useState } from "react";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useProducts } from "@/hooks/useProducts";

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

const DELIVERY_COST = 4000;

const Index = () => {
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const { toast } = useToast();
  const { products, categories, loading } = useProducts();

  const filteredProducts = selectedCategory === "Todos" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    toast({
      title: "¡Producto agregado!",
      description: `${product.name} se añadió a tu carrito`,
      duration: 2000,
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
    
    toast({
      title: "Producto eliminado",
      description: "El producto se eliminó de tu carrito",
      duration: 2000,
    });
  };

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) {
      toast({
        title: "Carrito vacío",
        description: "Agrega productos antes de realizar el pedido",
        variant: "destructive",
      });
      return;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + DELIVERY_COST;
    
    let message = "¡Hola! 🍽️ Me gustaría hacer el siguiente pedido:\n\n";
    
    cart.forEach(item => {
      message += `• ${item.name} x${item.quantity} - $${(item.price * item.quantity).toLocaleString()}\n`;
    });
    
    message += `\n💰 *Subtotal: $${subtotal.toLocaleString()}*\n`;
    message += `🚚 *Domicilio: $${DELIVERY_COST.toLocaleString()}*\n`;
    message += `💳 *Total: $${total.toLocaleString()}*\n\n`;
    message += "¡Gracias! 😊";

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/573127142928?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 restaurant-gradient rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white font-bold text-xl">R</span>
          </div>
          <p className="text-gray-600">Cargando productos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <Header 
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        handleWhatsAppOrder={handleWhatsAppOrder}
        deliveryCost={DELIVERY_COST}
      />

      {/* Hero Section with Background Image */}
      <section 
        className="relative py-20 px-4 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 107, 53, 0.8), rgba(247, 147, 30, 0.8)), url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
        }}
      >
        <div className="container mx-auto text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            Bienvenido a{" "}
            <span className="text-white">
              Restaurante Delicia
            </span>
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto drop-shadow-md">
            Disfruta de nuestros platos frescos y deliciosos, preparados con amor e ingredientes de la mejor calidad
          </p>
          <div className="w-24 h-1 bg-white mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "restaurant-gradient text-white" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 mt-20">
        <div className="container mx-auto text-center">
          <div className="w-12 h-12 restaurant-gradient rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">R</span>
          </div>
          <h3 className="text-2xl font-bold mb-4">Restaurante Delicia</h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Comprometidos con ofrecerte la mejor experiencia gastronómica. 
            Síguenos en nuestras redes sociales y mantente al día con nuestras novedades.
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <span>📍 Calle 123 #45-67, Bogotá</span>
            <span>📞 +57 312 714 2928</span>
            <span>⏰ Lun-Dom: 11:00 AM - 10:00 PM</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
