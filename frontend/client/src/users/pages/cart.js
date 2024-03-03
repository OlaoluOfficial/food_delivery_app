import { useState, useEffect } from "react";
import "./cart.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../CartContext";
import { FaTrash } from "react-icons/fa6";

function Cart() {
  const [cart, setCart] = useState([]);
  const [delivery, setDelivery] = useState(0);
  const [total, setTotal] = useState("");
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const { addCart } = useCart();

  const getCart = () => {
    axios
      .get("http://localhost:2300/api/v1/carts", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.items);
        setCart(response.data.items);
        addCart(response.data.items.length);
      })
      .catch((error) => {
        setError(error);
      });
  };
  useEffect(() => {
    getCart();
    getUser();
    getDelivery();
  }, []);

  const getUser = async () => {
    let User = await axios.get(
      "http://localhost:2300/api/v1/users/getProfile",
      { withCredentials: true }
    );
    setUser(User);
  };
  // useEffect(() => {
  //   getUser();
  // }, []);

  // const updateQuantity = (productId, newQuantity) => {
  //   // Update the quantity of the specified product in the cart
  //   const updatedCart = cart.map((item) =>
  //     item.id === productId ? { ...item, quantity: newQuantity } : item
  //   );
  //   setCart(updatedCart);
  // };

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:2300/api/v1/carts/${productId}`,
        { withCredentials: true }
      );
      if (response.status == 200) {
        let data = response.json();
        alert(data.data.msg);
        getCart();
        getDelivery();
      } else {
        let data = response.json();
        setError("Something went Wrong, Please try again later");
      }
    } catch (error) {
      setError("Something went Wrong, Please try again later");
    }
  };

  const handleIncrement = (productId) => {
    console.log(productId);
    const updatedCart = cart.map((item) => {
      return (
        item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    });
    setCart(updatedCart);
    getDelivery()
  };

  const handleDecrement = (productId) => {
    const updatedCart = cart.map((item) => {
      return (
        item._id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    });
    setCart(updatedCart);
    getDelivery();
  };

  const getTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const getDelivery = () => {
    setDelivery(getTotalPrice() * 0.1);
  };

 
  const handleCheckout = async () => {
    const total = parseInt(getTotalPrice() + delivery);
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
      if (response.status == 200) {
        let data = response.json();
        alert(data.data.message);
        setDelivery('')
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
              <li key={item._id}>
                <div className="leftCartSec-Headers">
                  <div className="cart-item-removal">
                    <div className="cart-item">
                      <img src={item.product.image} alt="item" />
                      <p>{item.product.name}</p>
                    </div>

                    <FaTrash
                      className="cart-trash-icon"
                      onClick={() => removeFromCart(item._id)}
                    ></FaTrash>
                  </div>

                  <div className="leftCartSec-down">
                    <div>
                      <button onClick={() => handleDecrement(item._id)}>
                        -
                      </button>
                      <input type="number" value={item.quantity} readOnly />
                      <button onClick={() => handleIncrement(item._id)}>
                        +
                      </button>
                    </div>
                    <div className="cart-prices">
                      <div className="cart-price-each">
                        <p>{item.price}</p>
                        <span>Each</span>
                      </div>
                      <p>{item.price.toFixed(2) * item.quantity}</p>
                    </div>
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
          <div className="rightCartSec-up light">
            <h5 className="light">Delivery fee</h5>
            <h5 className="light">{delivery.toFixed(2)}</h5>
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
