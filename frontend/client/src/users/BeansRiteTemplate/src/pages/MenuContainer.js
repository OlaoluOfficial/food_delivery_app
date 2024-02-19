import React, { useState, useEffect } from "react";
import BensCard from "./BensCard";
import MenuSideCart from "./MenuSideCart";
import axios from "axios";

export default function MenuContainer() {
  const [menus, setMenus] = useState([]);
  const [selectiedId, setSelectedId] = useState(null);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/menu`)
      .then((response) => {
        setMenus(response.data.menuItems);
      })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
        console.error("Error fetching menus:", error);
        console.log("Error response:", error.response);
      });
  }, []);

  return (
    <section className="section-menu">
      <div className="menu-header-box">
        <h2 className="heading-secondary">Our menu 🔥</h2>
        <p className="menu-paragraph">30 items showing &darr;</p>
      </div>
      <div className="menu-cart-flexbox">
        <div className="main-course">
          {menus.map((menu) => (
            <BensCard
              menu={menu}
              key={menu._id}
              selectedId={selectiedId}
              setSelectedId={setSelectedId}
            />
          ))}
        </div>
        <MenuSideCart
          // menus={menus}
          selectedId={selectiedId}
          setSelectedId={setSelectedId}
        />
      </div>
    </section>
  );
}
