import { useEffect, useState } from "react";
import data from "../data.json";
import axios from "axios";

export default function SideCart({ menu, selectedId }) {
  const [allMenu, setAllMenu] = useState([]);
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

  // useEffect(() => {
  //   function check() {
  //     // console.log(data)
  //     setAllMenu(menu)
  //     const selectedItem = allMenu.map((item) => {
  //       if (item.id === selectedId) {
  //         setSelectedFood(item);
  //       }
  //       if (selectedId === null) {
  //         setSelectedFood(null);
  //         setStatus("");
  //       }
  //     });
  //     console.log(selectedItem);
  //   }
  //   check();
  // }, [selectedId]);

  useEffect(() => {
    function check() {
      // console.log(data)
      axios
        .get("http://localhost:2300/api/v1/products")
        .then((response) => {
          console.log(response);
          setAllMenu(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching menus:", error);
        });

      const selectedItem = allMenu.map((item) => {
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

  const addToCart = (item, price) => {
    const cart = { ...item, offeredPrice: price };

    axios.post("http://localhost:2300/api/carts", cart).then((response) => {
      if (response.status === 201) {
        setSelectedFood({});
      }
    });
  };
  // console.log(selectedFood);

  const handleNegotiate = () => {
    const minimumPrice = selectedFood.minimumPrice;
    const userOffer = parseFloat(offerPrice);

    if (!isNaN(userOffer) && userOffer >= minimumPrice) {
      // Accept the offer
      setStatus("Offer Accepted");
      addToCart(selectedFood, userOffer);
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
