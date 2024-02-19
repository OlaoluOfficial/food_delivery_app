// import React, { useState } from "react";

function BensCard({ menu, selectedId, setSelectedId }) {
  // const [selectiedId, setSelectedId] = useState(null);

  function handleClick(id) {
    setSelectedId(id !== selectedId ? id : null);
    // console.log(id);
  }
  return (
    <div className="overall" onClick={() => handleClick(menu._id)}>
      <div className="content-box">
        <img
          className="img"
          src={`http://localhost:5000/${menu.foodImg}`}
          alt="beans img"
        />
        <div className="description">
          <strong className="dish-name">{menu.food}</strong>
          <p className="dish-description"> {menu.ingredients}</p>
          <div>
            <span className="description-status">
              Available {menu.available}{" "}
            </span>
            <span> &bull;</span>
            <span className="description-status"> sold {menu.sold}</span>
          </div>
        </div>
      </div>
      <div className="click-order">
        <span className={selectedId === menu._id ? "color-red" : "price"}>
          <sup className={selectedId === menu.id && "color-red"}>&#8358;</sup>
          {menu.price}
        </span>
        <button
          className={selectedId === menu._id ? "menu-btn bg-red" : "menu-btn"}
          onClick={() => handleClick(menu._id)}
        >
          {menu._id === selectedId ? menu.addedToCart : menu.cart}
        </button>
      </div>
    </div>
  );
}

export default BensCard;
