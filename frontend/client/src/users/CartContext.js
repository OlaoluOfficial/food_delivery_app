import { createContext, useState, useContext, useEffect } from "react";
const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cartItemCount, setCartItemCount] = useState(()=>{


  const storedCount = localStorage.getItem("cart");
  try {
    return storedCount ? JSON.parse(storedCount) : null;
  } catch (error) {
    console.error("Error parsing stored user data:", error);
    return null;
  }
});
  useEffect(() => {
    // Update local storage when user changes
    try {
      localStorage.setItem("cart", cartItemCount);
    } catch (error) {
      console.error("Error stringifying user data:", error);
    }
  }, [cartItemCount]);

  const addCarts = () => {
    setCartItemCount(cartItemCount + 1);
  };
  const clearCart = () => {
    setCartItemCount(0);
  }
  
  return (
    <CartContext.Provider value={{ cartItemCount, addCarts, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => {
  return useContext(CartContext);
};


