
import { useState, useEffect } from 'react';
import productsData from '../products.json';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setProducts(productsData);
      setLoading(false);
    }, 100);
  }, []);

  const categories = ["Todos", ...Array.from(new Set(products.map(product => product.category)))];

  return {
    products,
    categories,
    loading
  };
};
