import { useState, useEffect } from "react";
import "./cart.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Cart() {
  const [cart, setCart] = useState([]);
  const [delivery, setDelivery] = useState(0);
  const [total, setTotal] = useState("");
  const [user, setUser] = useState("");
  const [error, setError] = useState("");

  const getCart = async () => {
    let cartItems = await axios.get("http://localhost:2300/api/v1/carts");
    cartItems.json();
    setCart(cartItems);
  };
  useEffect(() => {
    getCart();
    getUser();
  }, []);

  const getUser = async () => {
    let User = await axios.get("http://localhost:2300/api/v1/users/getProfile");
    User.json();
    setUser(User);
  };
  // useEffect(() => {
  //   getUser();
  // }, []);

  const updateQuantity = (productId, newQuantity) => {
    // Update the quantity of the specified product in the cart
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:2300/api/v1/carts/${productId}`
      );
      if (response.ok) {
        let data = response.json();
        alert(data.data.message);
        getCart();
      } else {
        let data = response.json();
        setError("Something went Wrong, Please try again later");
      }
    } catch (error) {
      setError("Something went Wrong, Please try again later");
    }
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

  const getDelivery = () => {
    setDelivery(getTotalPrice() * 0.2);
  };

  useEffect(() => {
    getDelivery();
  }, []);

  const handleCheckout = async () => {
    const total = parseInt(getTotalPrice() + delivery);
    console.log(total);
    try {
      const payload = {
        amount: total,
        txRef: "ref-1000",
        email: user.email,
        phoneNumber: user.phoneNumber,
        name: user.name,
        redirectUrl: "http://localhost:2300/",
      };
      let response = await axios.post(
        "http://localhost:2300/api/v1/pay",
        payload
      );
      if (response.ok) {
        let data = response.json();
        alert(data.data.message);
      } else {
        let data = response.json();
        setError(data.data.message);
      }
    } catch (error) {
      setError(error.response.data);
    }
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

          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <div className="leftCartSec-Headers">
                  <img src={item.image} alt="item" />
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
            <h5>ITEMS {cart.length}</h5> <h5>{getTotalPrice()}</h5>
          </div>
          <div className="rightCartSec-up">
            <h5>Delivery fee</h5>
            <h5>{delivery.toFixed(2)}</h5>
          </div>
          <div className="rightCartSec-up">
            <h5>TOTAL COST</h5>
            <h5>{(parseInt(getTotalPrice()) + delivery).toFixed(2)}</h5>
          </div>
          <button className="cartButton" onClick={handleCheckout}>
            Check out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
