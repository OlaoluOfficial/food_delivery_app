import React, { useState, useEffect } from "react";
import BensCard from "./BensCard";
import MenuSideCart from "./MenuSideCart";
import axios from "axios";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function MenuContainer() {
  const [menus, setMenus] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:5000/api/menu`)
  //     .then((response) => {
  //       setMenus(response.data.menuItems);
  //     })
  //     .catch((error) => {
  //       console.log("Error fetching and parsing data", error);
  //       console.error("Error fetching menus:", error);
  //       console.log("Error response:", error.response);
  //     });
  // }, []);

  useEffect(() => {
    let url = "http://localhost:2300/api/v1/products";
    if (search != "") {
      axios
        .get(`http://localhost:2300/api/v1/search?q=${search}`)
        .then((response) => {
          setMenus(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching menus:", error);
        });
    } else {
      axios
        .get(url)
        .then((response) => {
          setMenus(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching menus:", error);
        });
    }
  }, [search]);

  return (
    <section className="section-menu">
      <div className="menu-header-box">
        <h2 className="heading-secondary">Our menu 🔥</h2>
        <form className="menu-search">
          <input
            className="input_search"
            placeholder="Search for food or restaurant"
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaMagnifyingGlass className="search" />
        </form>
        {/* <p className="menu-paragraph">30 items showing &darr;</p> */}
      </div>
      <div className="menu-cart-flexbox">
        {/* <div className="main-course">
          {menus.map((menu) => (
            <BensCard
              menu={menu}
              key={menu._id}
              selectedId={selectiedId}
              setSelectedId={setSelectedId}
            />
          ))}
        </div> */}

        <div className="main-course">
          {menus.map((menu) => (
            <BensCard
              menu={menu}
              key={menu.id}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
          ))}
        </div>
        <MenuSideCart
          menus={menus}
          selectedId={selectedId}
          // setSelectedId={setSelectedId}
        />
      </div>
    </section>
  );
}
