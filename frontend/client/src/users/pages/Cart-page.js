import React, { useState } from "react";

const NegotiationCart = ({ product, onNegotiate }) => {
  const [offerPrice, setOfferPrice] = useState("");

  const handleOfferChange = (event) => {
    setOfferPrice(event.target.value);
  };

  const handleNegotiate = () => {
    const minimumPrice = product.minimumPrice; // Replace with actual backend logic
    const userOffer = parseFloat(offerPrice);

    if (!isNaN(userOffer) && userOffer >= minimumPrice) {
      // Accept the offer
      onNegotiate(product.id, userOffer);
    } else {
      // Show an error (you might want to handle this differently)
      alert("Error: Invalid offer or below minimum price!");
    }
  };

  return (
    <div className="negotiation-cart">
      <h3>Negotiation Cart</h3>
      <div>
        <p>{product.name}</p>
        <p>Current Price: ${product.price.toFixed(2)}</p>
        <label>
          Your Offer: $
          <input
            type="number"
            value={offerPrice}
            onChange={handleOfferChange}
          />
        </label>
        <button onClick={handleNegotiate}>Negotiate</button>
      </div>
    </div>
  );
};

export default NegotiationCart;
