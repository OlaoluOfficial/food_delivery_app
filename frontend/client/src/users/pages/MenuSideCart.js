import { useEffect, useState } from "react";
import data from "../data.json";
import axios from "axios";

export default function SideCart({ menu, selectedId }) {
  const [selectedFood, setSelectedFood] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [status, setStatus] = useState("");

  const handleOfferChange = (event) => {
    setOfferPrice(event.target.value);
  };
  // const id = selectedFood.menuItems._id;
  // useEffect(
  //   function () {
  //     async function DisplaySelected() {
  //       const res = await fetch(`http://localhost:5000/api/menu`);
  //       const data = await res.json();
  //       console.log(selectedId);
  //       setSelectedFood(data.menuItems);
  //     }
  //     DisplaySelected();
  //   },
  //   [selectedId]
  // );
  // console.log(selectedFood);
  // console.log(data)

  useEffect(() => {
    function check() {
      // console.log(data)
      const selectedItem = data.map((item) => {
        if (item.id === selectedId) {
          setSelectedFood(item);
        }
        if (selectedId === null) {
          setSelectedFood(null);
          setStatus("");
        }
      });
      console.log(selectedItem);
    }
    check();
  }, [selectedId]);
  const addToCart = (id, price) => {
    const cart = {
      id: id,
      price: price,
    };
    axios.post("localhost:3000/api/addToCart", cart).then((response) => {
      if (response.status === 201) {
        setSelectedFood({});
      }
    });
  };
  // console.log(selectedFood);

  const handleNegotiate = () => {
    const minimumPrice = selectedFood.minimumPrice; // Replace with actual backend logic
    const userOffer = parseFloat(offerPrice);

    if (!isNaN(userOffer) && userOffer >= minimumPrice) {
      // Accept the offer
      setStatus("Offer Accepted, Please add item to cart");
      addToCart(selectedFood, userOffer);
    } else {
      // Show an error (you might want to handle this differently)
      setStatus("Negotiate Higer 😔");
    }
  };

  return (
    <div className="side-cart-container">
      <h3>Negotiation Cart</h3>
      {selectedFood ? (
        <div className="side-cart-inner-container">
          <div className="side-cart-upper">
            <img src={selectedFood.image} alt="Food" />
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
          >
            Negotiate
          </button>
        </div>
      ) : (
        <p className="sideCartPara">Please add an item to cart</p>
      )}
    </div>

    // <div
    //   className={selectedFood ? "side-cart-container" : "side-cart-container-2"}
    // >
    //   <h1>Side Cart</h1>
    //   {selectedFood ? (
    //     <p>{selectedId}</p>
    //   ) : (
    //     <p className="sideCartPara">Please add an item to cart</p>
    //   )}
    // </div>
  );
}
