import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../CartContext";
import Swal from "sweetalert2";

export default function SideCart({ menu, selectedId }) {
  const [allMenu, setAllMenu] = useState([]);
  const [selectedFood, setSelectedFood] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [status, setStatus] = useState("");
  const [res, setRes] = useState("");

  const navigate = useNavigate();
  const { addCarts } = useCart();

  const handleOfferChange = (event) => {
    setOfferPrice(event.target.value);
  };

  useEffect(() => {
    function check() {
      axios
        .get("http://localhost:2300/api/v1/products")
        .then((response) => {
          setAllMenu(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching menus:", error);
        });

      const selectedItem = allMenu.map((item) => {
        if (item._id === selectedId) {
          setSelectedFood(item);
        }
        if (selectedId === null) {
          setSelectedFood(null);
          setStatus("");
        }
      });
    }
    check();
  }, [selectedId]);

  const addToCart = async (ProductId, Price) => {
    const cart = { productId: ProductId, price: Price, quantity: 1 };
    try {
      const response = await axios.post(
        "http://localhost:2300/api/v1/carts",
        cart,
        { withCredentials: true }
      );
      if (response.status == 200) {
        addCarts();
        setSelectedFood("");
      } else {
        setRes(response.data.message);
      }
    } catch (error) {
      if (error.response.status === 401) {
        Swal.fire({
          position: "center",
          icon: "succes",
          title: "Please login to your account!",
          showConfirmButton: false,
          timer: 2500,
        });
        navigate("/login");
      }
    }
  };

  const handleNegotiate = () => {
    const minimumPrice = selectedFood.minimumPrice;
    const userOffer = parseFloat(offerPrice);

    if (!isNaN(userOffer) && userOffer >= minimumPrice) {
      // Accept the offer
      setStatus("Offer Accepted");
      addToCart(selectedFood._id, userOffer);
    } else {
      // Show an error (you might want to handle this differently)
      setStatus("Negotiate Higher 😔");
    }
  };

  return (
    <div className="side-cart-container">
      <h3>Negotiation Cart</h3>
      {selectedFood ? (
        <div className="side-cart-inner-container">
          <div className="side-cart-upper">
            <img src={selectedFood.productPictures[0]} alt="Food" />
            <p>{selectedFood.name}</p>
          </div>
          <p className="para">Current Price: &#8358; {selectedFood.price}</p>
          <label>
            Your Offer: &#8358;
            <input
              type="number"
              value={offerPrice}
              onChange={handleOfferChange}
              placeholder="0"
            />
          </label>
          <p>{status}</p>
          <button
            className="side-cart-inner-container-btn"
            onClick={handleNegotiate}
            type="submit"
          >
            Negotiate
          </button>
        </div>
      ) : (
        <p className="sideCartPara">Please add an item to cart</p>
      )}
    </div>
  );
}
