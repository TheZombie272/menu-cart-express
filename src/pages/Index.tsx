
import { useState } from "react";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

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

const products: Product[] = [
  // Hamburguesas
  {
    id: 1,
    name: "Hamburguesa Clásica",
    price: 12000,
    image: "photo-1618160702438-9b02ab6515c9",
    description: "Jugosa carne de res, lechuga, tomate, cebolla y nuestra salsa especial",
    category: "Hamburguesas"
  },
  {
    id: 2,
    name: "Hamburguesa BBQ",
    price: 15000,
    image: "photo-1618160702438-9b02ab6515c9",
    description: "Carne de res, tocino, cebolla caramelizada y salsa BBQ casera",
    category: "Hamburguesas"
  },
  {
    id: 3,
    name: "Hamburguesa Vegana",
    price: 14000,
    image: "photo-1618160702438-9b02ab6515c9",
    description: "Deliciosa hamburguesa plant-based con vegetales frescos",
    category: "Hamburguesas"
  },
  {
    id: 4,
    name: "Hamburguesa Pollo",
    price: 13000,
    image: "photo-1618160702438-9b02ab6515c9",
    description: "Pechuga de pollo crispy, aguacate, lechuga y mayo de cilantro",
    category: "Hamburguesas"
  },
  // Bebidas
  {
    id: 5,
    name: "Limonada Natural",
    price: 5000,
    image: "photo-1465146344425-f00d5f5c8f07",
    description: "Refrescante limonada con limones frescos y hierbabuena",
    category: "Bebidas"
  },
  {
    id: 6,
    name: "Malteada de Fresa",
    price: 8000,
    image: "photo-1465146344425-f00d5f5c8f07",
    description: "Cremosa malteada con fresas naturales y helado de vainilla",
    category: "Bebidas"
  },
  {
    id: 7,
    name: "Café Americano",
    price: 4000,
    image: "photo-1465146344425-f00d5f5c8f07",
    description: "Café de origen colombiano, tostado artesanal",
    category: "Bebidas"
  },
  {
    id: 8,
    name: "Smoothie Verde",
    price: 9000,
    image: "photo-1465146344425-f00d5f5c8f07",
    description: "Espinaca, piña, manzana verde y jengibre. ¡Súper saludable!",
    category: "Bebidas"
  },
  // Postres
  {
    id: 9,
    name: "Cheesecake de Frutos",
    price: 7000,
    image: "photo-1618160702438-9b02ab6515c9",
    description: "Cremoso cheesecake con mermelada de frutos rojos",
    category: "Postres"
  },
  {
    id: 10,
    name: "Brownie con Helado",
    price: 8000,
    image: "photo-1618160702438-9b02ab6515c9",
    description: "Brownie de chocolate caliente con helado de vainilla",
    category: "Postres"
  },
  {
    id: 11,
    name: "Tiramisú Casero",
    price: 9000,
    image: "photo-1618160702438-9b02ab6515c9",
    description: "Clásico tiramisú italiano con café expresso y mascarpone",
    category: "Postres"
  },
  {
    id: 12,
    name: "Helado Artesanal",
    price: 6000,
    image: "photo-1618160702438-9b02ab6515c9",
    description: "3 bolas de helado artesanal: vainilla, chocolate y fresa",
    category: "Postres"
  }
];

const categories = ["Todos", "Hamburguesas", "Bebidas", "Postres"];

const Index = () => {
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const { toast } = useToast();

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

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    let message = "¡Hola! 🍽️ Me gustaría hacer el siguiente pedido:\n\n";
    
    cart.forEach(item => {
      message += `• ${item.name} x${item.quantity} - $${(item.price * item.quantity).toLocaleString()}\n`;
    });
    
    message += `\n💰 *Total: $${total.toLocaleString()}*\n\n`;
    message += "¡Gracias! 😊";

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/573001234567?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <Header 
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        handleWhatsAppOrder={handleWhatsAppOrder}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Bienvenido a{" "}
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Restaurante Delicia
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Disfruta de nuestros platos frescos y deliciosos, preparados con amor e ingredientes de la mejor calidad
          </p>
          <div className="w-24 h-1 restaurant-gradient mx-auto rounded-full"></div>
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
            <span>📞 +57 300 123 4567</span>
            <span>⏰ Lun-Dom: 11:00 AM - 10:00 PM</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
