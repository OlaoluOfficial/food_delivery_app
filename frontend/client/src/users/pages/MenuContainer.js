import React, { useState, useEffect } from "react";
import BensCard from "./BensCard";
import MenuSideCart from "./MenuSideCart";
import axios from "axios";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function MenuContainer() {
  const [menus, setMenus] = useState([]);
  const [search, setSearch] = useState("");
  const [search2, setSearch2] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch2(search);
  };

  useEffect(() => {
    let url = "http://localhost:2300/api/v1/products";
    if (search != "") {
      axios
        .get(`http://localhost:2300/api/v1/search?q=${search2}`)
        .then((response) => {
          if (response.data.products.length > 0) {
            setMenus(response.data.products);
          } else {
            alert("No Result Found");
          }
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
  }, [search2]);

  return (
    <section className="section-menu">
      <div className="menu-header-box">
        <h2 className="heading-secondary">Our menu 🔥</h2>
        <form className="menu-search" onSubmit={handleSearch}>
          <input
            className="input_search"
            placeholder="Search for food"
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaMagnifyingGlass className="search" type="button"  onClick={handleSearch }/>
        </form>
      </div>
      <div className="menu-cart-flexbox">
        <div className="main-course">
          {menus.map((menu) => (
            <BensCard
              menu={menu}
              key={menu._id}
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
