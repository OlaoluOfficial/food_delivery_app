import { useState, useEffect } from "react";
import "./cart.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTrash } from "react-icons/fa6";
import LoginPage from "../components/loginPage";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

function Cart() {
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState("");
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const [checkoutError, setCheckoutError] = useState("");
  // const { addCart } = useCart();
  const token = Cookies.get("foodieToken");
  const [decode, setDecode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      var decoded = jwtDecode(token);
      setDecode(decoded.user.role);
    }
  }, []);

  const getCart = () => {
    axios
      .get("http://localhost:2300/api/v1/carts", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          setCart(response.data.items);
          setCartId(response.data._id);
          console.log(cart);
        }
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data.msg);
      });
  };
  useEffect(() => {
    getCart();
    getUser();
    getDelivery();
  }, []);

  const getUser = async () => {
    try {
      let User = await axios.get(
        "http://localhost:2300/api/v1/users/getProfile",
        { withCredentials: true }
      );
      if (User.status === 200) {
        setUser(User.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:2300/api/v1/carts/${productId}`,
        { withCredentials: true }
      );
      if (response.status == 200) {
        console.log(response);
        setCart(response.data.items);
        getDelivery();
      } else {
        setError("Something went Wrong, Please try again later");
      }
    } catch (error) {
      setError("Something went Wrong, Please try again later");
    }
  };

  const handleIncrement = (productId) => {
    console.log(productId);
    const updatedCart = cart.map((item) => {
      return item._id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item;
    });
    setCart(updatedCart);
    getDelivery();
  };

  const handleDecrement = (productId) => {
    const updatedCart = cart.map((item) => {
      return item._id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item;
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
    return (getTotalPrice() * 0.1).toFixed(2);
  };

  const handleCheckout = async () => {
    const total = parseInt(getTotalPrice()) + parseInt(getDelivery());

    try {
      const payload = {
        totalPrice: total,
        products: cart,
        cartId: cartId,
        customer: {
          location: user.address,
          email: user.email,
          name: user.username,
          phoneNumber: user.phone,
        },
      };
      console.log(payload);

      let response = await axios.post(
        "http://localhost:2300/api/v1/pay",
        payload,
        { withCredentials: true }
      );
      if (response.status == 200) {
        const redirectUrl = response.data.data;
        window.open(redirectUrl);
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: response.data.message,
          showConfirmButton: false,
          timer: 2500,
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: true,
        timer: 2500,
      });
    }
  };

  return (
    <>
      {decode === "customer" ? (
        <div className="outer-container">
          <div className="cartContainer">
            <div className="leftCartSec">
              <div className="leftCartSec-up">
                <h4>Cart</h4>
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
                          <img
                            src={item.product.productPictures[0]}
                            alt="item"
                          />
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
              {error && <p className="error">{error}</p>}
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
                <h5 className="light">{getDelivery()}</h5>
              </div>
              <div className="rightCartSec-up">
                <h5>TOTAL COST</h5>
                <h5>
                  {(
                    parseInt(getTotalPrice()) + parseInt(getDelivery())
                  ).toFixed(2)}
                </h5>
              </div>

              <button className="cartButton" onClick={handleCheckout}>
                Check out
              </button>
            </div>
          </div>
        </div>
      ) : (
        <LoginPage />
      )}
    </>
  );
}

export default Cart;
