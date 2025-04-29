import { createContext, useContext, useState, ReactNode } from 'react';

// Estructura adaptada del producto
export interface Categoria {
  id: number;
  nombre: string;
}

export interface MenuItemType {
  id?: number;
  nombre?: string;
  descripcion?: string;
  precio?: string; // Agregar precio si es necesario
  precio_descuento: string;
  unidad?: string; // Agregar unidad si es necesario
  categoria?: Categoria;
  estado?: string;
  estado_descuento?: string;
  fecha_creacion?: string;
  fecha_actualizacion?: string;
  image?: any
  quantity?: any
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
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

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
