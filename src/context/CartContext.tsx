import { createContext, useContext, useState, ReactNode } from 'react';

export interface MenuItemType {
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface CartItem extends MenuItemType {
  quantity: number;
}

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (item: MenuItemType) => void;
  removeFromCart: (name: string) => void;
  increment: (name: string) => void;
  decrement: (name: string) => void;
  total: number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: MenuItemType) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.name === item.name);
      if (existing) {
        return prev.map(i => i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (name: string) => {
    setCartItems(prev => prev.filter(i => i.name !== name));
  };

  const increment = (name: string) => {
    setCartItems(prev => prev.map(i => i.name === name ? { ...i, quantity: i.quantity + 1 } : i));
  };

  const decrement = (name: string) => {
    setCartItems(prev =>
      prev.map(i =>
        i.name === name ? { ...i, quantity: i.quantity > 1 ? i.quantity - 1 : 1 } : i
      )
    );
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
