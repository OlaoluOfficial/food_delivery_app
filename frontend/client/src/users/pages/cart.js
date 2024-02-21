import React, { useState } from "react";
import "./cart.css";
import { Link } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const [delivery, setDelivery] = useState(0);

  const products = [
    { id: 1, name: "Product 1", price: 10.99 },
    { id: 2, name: "Product 2", price: 19.99 },
    { id: 3, name: "Product 3", price: 5.99 },
  ];

  const addToCart = (product) => {
    const updatedCart = [...cart];
    const existingItem = updatedCart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCart(updatedCart);
  };

  const updateQuantity = (productId, newQuantity) => {
    // Update the quantity of the specified product in the cart
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  const handleIncrement = (productId) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const handleDecrement = (productId) => {
    const updatedCart = cart.map((item) =>
      item.id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
  };

  const getTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="outer-container">
      <div className="cartContainer">
        <div className="leftCartSec">
          <div className="leftCartSec-up">
            <h4>Shopping Cart</h4>
            <h5>{cart.length} Items</h5>
          </div>

          <div className="leftCartSec-Headers">
            <h5>FOOD DETAILS</h5>
            <div>
              <h5>QUANTITY</h5>
              <h5>PRICE</h5>
              <h5>TOTAL</h5>
            </div>
          </div>
          {/* <ul>
            {products.map((product) => (
              <li key={product.id}>
                {product.name} - ${product.price.toFixed(2)}
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              </li>
            ))}
          </ul> */}

          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <div className="leftCartSec-Headers">
                  <img src={item.image} alt="item image" />
                  <p>{item.name}</p>
                  <button onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                  <div>
                    <div>
                      <button onClick={handleDecrement}>-</button>
                      <input type="number" value={item.quantity} readOnly />
                      <button onClick={handleIncrement}>+</button>
                    </div>
                    <p>{item.price.toFixed(2)}</p>

                    <p>{item.price.toFixed(2) * item.quantity}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="cartBottom">
            <div>
              <Link to="/" className="cartBottomLink">
                &larr; Continue Shopping
              </Link>
            </div>
            <div className="cartSubTotal">
              <h4>Sub Total</h4>
              <h4>{getTotalPrice()}</h4>
            </div>
          </div>
        </div>
        <div className="rightCartSec">
          <div className="rightCartSec-ups">
            <h4>Order Summary</h4>
          </div>
          <div className="rightCartSec-up">
            <h5>ITEMS {cart.length}</h5> <h5>${getTotalPrice()}</h5>
          </div>
          <div className="rightCartSec-up">
            <h5>Delivery fee</h5>
            <h5>{delivery}</h5>
          </div>
          <div className="rightCartSec-up">
            <h5>TOTAL COST</h5>
            <h5>{getTotalPrice() + delivery}</h5>
          </div>
          <button className="cartButton">Check out</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
