"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  slug: string;
  variation?: {
    size?: string;
    color?: string;
  };
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, variationId?: string) => void;
  updateQuantity: (id: string, quantity: number, variationId?: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      // Check if item with same ID AND same variation already exists
      const existingItemIndex = prevCart.findIndex(
        (i) => 
          i.id === item.id && 
          i.variation?.size === item.variation?.size && 
          i.variation?.color === item.variation?.color
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += item.quantity;
        return newCart;
      }
      return [...prevCart, item];
    });
  };

  const removeFromCart = (id: string, variationKey?: string) => {
    setCart((prevCart) => prevCart.filter(item => {
      const itemKey = `${item.id}-${item.variation?.size}-${item.variation?.color}`;
      const targetKey = variationKey ? `${id}-${variationKey}` : id;
      return itemKey !== targetKey;
    }));
  };

  const updateQuantity = (id: string, quantity: number, variationKey?: string) => {
    if (quantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) => {
        const itemKey = `${item.id}-${item.variation?.size}-${item.variation?.color}`;
        const targetKey = variationKey ? `${id}-${variationKey}` : id;
        if (itemKey === targetKey) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
