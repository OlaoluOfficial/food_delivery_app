import React, { useEffect, useState } from "react";
import "../styles/Yemi.css";
import axios from "axios";
import pulpy from "../img/puppy.webp";

const Combo = () => {
  const [combos, setCombos] = useState([]);
  const [selectedId, setSelectedId] = useState();

  function handleClick(id) {
    setSelectedId(id !== selectedId ? id : null);
  }

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/getcombos")
      .then((response) => {
        setCombos(response.data.combos);
      })
      .catch((error) => {
        console.error("Error fetching combos:", error);
      });
  }, []);

  console.log("combo list", combos);

  return (
    <section>
      <div className="top"></div>
      <div className="container">
        <h1 className="combo">Combo Deals</h1>
        <div className="grid">
          {combos.map((combo) => (
            <div className="box" key={combo._id}>
              <div className="combo_deals">
                <div className="image-container">
                  <img
                    className="beans"
                    src={`http://localhost:5000/${combo.foodImg}`}
                    alt=""
                  />
                  <img
                    className="larger-image"
                    src={`http://localhost:5000/${combo.foodImg}`}
                    alt=""
                  />
                </div>
                <p className="add">+</p>
                <img className="pulpy" src={pulpy} alt="" />
              </div>
              <p className="foodname">{combo.title}</p>
              <p className="price">#{combo.price}</p>
              <div className="toggle">
                <button
                  onClick={() => handleClick(combo._id)}
                  className={selectedId === combo._id ? "bg-red" : "combo-btn"}
                >
                  {selectedId === combo._id
                    ? combo.addedToCart + " 🛒"
                    : combo.cart + " 🛒"}
                </button>
                {/* <button className="menu-btn">Add to cart &nbsp; 🛒</button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Combo;
