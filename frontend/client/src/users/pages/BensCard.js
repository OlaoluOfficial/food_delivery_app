// import React, { useState } from "react";
import image1 from "../beansLogo.png";

function BensCard({ menu, selectedId, setSelectedId }) {
  function handleClick(id) {
    setSelectedId(id !== selectedId ? id : null);
    // console.log(id);
  }
  return (
    <div className="overall" onClick={() => handleClick(menu.id)}>
      <div className="content-box">
        <img className="img" src={image1} alt="beans img" />
        <div className="description">
          <strong className="dish-name">{menu.name}</strong>
          <p className="dish-description"> {menu.ingredients}</p>
        </div>
      </div>
      <div className="dish-name">
        <p>
          Vendor: <span>{menu.restaurant}</span>
        </p>
      </div>
      <div className="click-order">
        <span className={selectedId === menu.id ? "color-red" : "price"}>
          <sup className={selectedId === menu.id && "color-red"}>&#8358;</sup>
          {menu.price}
        </span>
        <button
          className={selectedId === menu.id ? "menu-btn bg-red" : "menu-btn"}
          onClick={() => handleClick(menu.id)}
        >
          {menu.id === selectedId ? menu.selected : menu.option}
        </button>
      </div>
    </div>
  );
}

export default BensCard;
