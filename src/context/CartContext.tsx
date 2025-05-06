import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export interface Categoria {
  id: number;
  nombre: string;
}

export interface MenuItemType {
  id?: number;
  nombre?: string;
  descripcion?: string;
  precio?: string;
  precio_descuento: string;
  unidad?: string;
  categoria?: Categoria;
  estado?: string;
  estado_descuento?: string;
  fecha_creacion?: string;
  fecha_actualizacion?: string;
  image?: any;
  quantity?: any;
}

export interface CartItem extends MenuItemType {
  quantity: number;
}

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (item: MenuItemType) => void;
  removeFromCart: (id: number) => void;
  increment: (id: number) => void;
  decrement: (id: number) => void;
  total: number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { id: comercioId } = useParams<{ id: string }>(); // Obtén el comercioId de la URL
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const loadCartItems = (comercioId: string) => {
    const savedCart = localStorage.getItem(`cart_${comercioId}`);
    return savedCart ? JSON.parse(savedCart) : [];
  };

  useEffect(() => {
    if (comercioId) {
      setCartItems(loadCartItems(comercioId));
    }
  }, [comercioId]);

  useEffect(() => {
    if (comercioId) {
      localStorage.setItem(`cart_${comercioId}`, JSON.stringify(cartItems));
    }
  }, [cartItems, comercioId]);

  const addToCart = (item: MenuItemType) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const increment = (id: number) => {
    setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i));
  };

  const decrement = (id: number) => {
    setCartItems(prev =>
      prev.map(i =>
        i.id === id ? { ...i, quantity: i.quantity > 1 ? i.quantity - 1 : 1 } : i
      )
    );
  };

  const total = cartItems.reduce((sum, item) => sum + parseFloat(item.precio_descuento) * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, increment, decrement, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
  return context;
};
