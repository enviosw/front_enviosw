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
  clearCart: () => void; // Agregar la función para limpiar el carrito
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { id: comercioId } = useParams<{ id: string }>(); // Obtén el comercioId de la URL
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Función para cargar el carrito desde localStorage
  const loadCartItems = (comercioId: string) => {
    const savedCart = localStorage.getItem(`cart_${comercioId}`);
    return savedCart ? JSON.parse(savedCart) : [];
  };

  // Cargar el carrito solo si cambia el comercioId y los datos del carrito no están vacíos
  useEffect(() => {
    if (comercioId) {
      const savedCart = loadCartItems(comercioId);
      // Si ya existen datos en localStorage, solo los cargamos
      if (savedCart.length > 0) {
        setCartItems(savedCart);
      }
    }
  }, [comercioId]);

  // Guardar el carrito en localStorage solo si cartItems cambia
  useEffect(() => {
    if (comercioId && cartItems.length > 0) {
      localStorage.setItem(`cart_${comercioId}`, JSON.stringify(cartItems));
    }
  }, [cartItems, comercioId]);

  // Agregar un producto al carrito
  const addToCart = (item: MenuItemType) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // Eliminar un producto del carrito
  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  // Incrementar la cantidad de un producto
  const increment = (id: number) => {
    setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i));
  };

  // Decrementar la cantidad de un producto
  const decrement = (id: number) => {
    setCartItems(prev =>
      prev.map(i =>
        i.id === id ? { ...i, quantity: i.quantity > 1 ? i.quantity - 1 : 1 } : i
      )
    );
  };

  // Limpiar todos los productos del carrito (sin afectar el localStorage)
  const clearCart = () => {
    setCartItems([]); // Vacía el carrito en el estado
    if (comercioId) {
      localStorage.setItem(`cart_${comercioId}`, JSON.stringify([])); // Limpia el carrito en localStorage también
    }
  };

  // Calcular el total
  const total = cartItems.reduce((sum, item) => sum + parseFloat(item.precio_descuento) * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, increment, decrement, total, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
  return context;
};
