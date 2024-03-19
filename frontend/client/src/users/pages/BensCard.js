// import React, { useState } from "react";
import image1 from "../beans-img3.jpg";

function BensCard({ menu, selectedId, setSelectedId }) {
  function handleClick(id) {
    setSelectedId(id !== selectedId ? id : null);
  }
  return (
    <div className="overall" onClick={() => handleClick(menu._id)}>
      <div className="content-box">
        <img className="card-img" src={menu.productPictures[0]} alt="food" />
        <div className="description">
          <strong className="dish-name">{menu.name}</strong>
          <p className="dish-description"> {menu.description}</p>
        </div>
      </div>
      <div className="dish-name">
        <p className="vendor-name-box">
          <span className="vendor-name">{menu.restaurant.name} </span>
        </p>
      </div>
      <div className="click-order">
        <span
          className={selectedId === menu._id ? "color-red" : "color-orange"}
        >
          <sup className={selectedId === menu._id && "color-red"}>&#8358;</sup>
          {menu.price}
        </span>
        <button
          className={
            selectedId === menu._id ? "menu-btn bg-red" : "menu-btn bg-orange"
          }
          onClick={() => handleClick(menu._id)}
        >
          {menu._id === selectedId ? "Food Added" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

export default BensCard;
