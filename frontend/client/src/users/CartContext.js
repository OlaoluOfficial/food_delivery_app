import { createContext, useState, useContext } from "react";
const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const addCart = (count) => {
    setCartItemCount(count);
  };
  return (
    <CartContext.Provider value={{ cartItemCount, addCart }}>
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => {
  return useContext(CartContext);
};
