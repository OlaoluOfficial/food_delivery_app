import React, { useState } from "react";
import NegotiationCart from "./Cart-page";

const MainApp = () => {
  const [negotiationCart, setNegotiationCart] = useState([]);

  const handleNegotiate = (productId, userOffer) => {
    // Send a request to the backend to process the negotiation
    // You would typically make an API call to handle this negotiation on the server
    // You can replace the following lines with actual backend logic
    const updatedNegotiationCart = negotiationCart.map((item) =>
      item.id === productId ? { ...item, userOffer } : item
    );
    setNegotiationCart(updatedNegotiationCart);
  };

  const products = [
    { id: 1, name: "Product 1", price: 50.0, minimumPrice: 45.0 },
    // Add more products...
  ];

  return (
    <div className="main-app">
      {products.map((product) => (
        <NegotiationCart
          key={product.id}
          product={product}
          onNegotiate={handleNegotiate}
        />
      ))}
    </div>
  );
};

export default MainApp;
