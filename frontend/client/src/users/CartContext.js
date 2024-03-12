import { createContext, useState, useContext } from "react";
const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const addCarts = () => {
    setCartItemCount(cartItemCount + 1);
  };
  return (
    <CartContext.Provider value={{ cartItemCount, addCarts }}>
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => {
  return useContext(CartContext);
};
