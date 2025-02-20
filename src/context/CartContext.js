// context/CartContext.js
"use client"; // اضافه کردن این خط برای تضمین اجرای کلاینتی

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  // Load cart from localStorage on mount (only in client)
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
    updateTotals(savedCart);
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  // Calculate total price and item count
  const updateTotals = (currentCart) => {
    const total = currentCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const items = currentCart.reduce((acc, item) => acc + item.quantity, 0);
    setTotalPrice(total);
    setTotalItems(items);
  };

  // Add item to cart
  const addToCart = (order) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      const existingProductIndex = updatedCart.findIndex((item) => item._id == order._id);

      if (existingProductIndex !== -1) {
        return prevCart;
      } else {
        updatedCart.push({ ...order});
      }

      updateTotals(updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (productId) => {
    if(cart.length == 1 && productId == cart[0]._id){
      localStorage.removeItem('cart');
    }
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item._id !== productId);
      updateTotals(updatedCart);
      return updatedCart;
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      );
      updateTotals(updatedCart);
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    setTotalPrice(0);
    setTotalItems(0);
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
        totalItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
