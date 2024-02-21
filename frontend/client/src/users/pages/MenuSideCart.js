import { useEffect, useState } from "react";

export default function SideCart({ menu, selectedId }) {
  const [selectedFood, setSelectedFood] = useState("");
  // const id = selectedFood.menuItems._id;
  useEffect(
    function () {
      async function DisplaySelected() {
        const res = await fetch(`http://localhost:5000/api/menu`);
        const data = await res.json();
        console.log(selectedId);
        setSelectedFood(data.menuItems);
      }
      DisplaySelected();
    },
    [selectedId]
  );
  // console.log(selectedFood);
  return (
    <div className="side-cart-container">
      <h3>Side Cart</h3>
      {selectedFood ? <p>{selectedId}</p> : <p className="sideCartPara">Please add an item to cart</p>}
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
