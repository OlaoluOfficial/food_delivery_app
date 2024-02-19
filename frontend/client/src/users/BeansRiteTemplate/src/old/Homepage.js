// import { useState } from "react";
// import "./index.css";
// import Hero from "./Hero";
// import img1 from "./img/beans-img.jpg";
// import img2 from "./img/beans-img1.jpg";
// import img3 from "./img/beans-img8.jpg";
// import img4 from "./img/beans-img3.jpg";
// import img5 from "./img/beans-img9.jpg";
// import img6 from "./img/beans-img10.jpg";
// import img7 from "./img/beans-img6.jpg";
// import img8 from "./img/beans-img7.jpg";
// import img9 from "./img/beans-img.jpg";
// import img10 from "./img/beans-img1.jpg";
// import img11 from "./img/beans-img4.jpg";
// import img12 from "./img/beans-img5.jpg";
// import img13 from "./img/beans-img.jpg";
// import img14 from "./img/beans-img1.jpg";
// import img15 from "./img/beans-img8.jpg";
// import img16 from "./img/beans-img3.jpg";
// import img17 from "./img/beans-img9.jpg";
// import img18 from "./img/beans-img10.jpg";
// import img19 from "./img/beans-img6.jpg";
// import img20 from "./img/beans-img7.jpg";
// import img21 from "./img/beans-img.jpg";
// import img22 from "./img/beans-img1.jpg";
// import img23 from "./img/beans-img4.jpg";
// import img24 from "./img/beans-img5.jpg";
// import img25 from "./img/beans-img6.jpg";
// import img26 from "./img/beans-img7.jpg";
// import img27 from "./img/beans-img.jpg";
// import img28 from "./img/beans-img1.jpg";
// import img29 from "./img/beans-img4.jpg";
// import img30 from "./img/beans-img5.jpg";

// const beansData = [
//   {
//     name: "vegitable beans special",
//     ingredients: "vegitables, onions mega belsnd ingridents",
//     price: 1200,
//     available: 12,
//     sold: 0,
//     photoName: img1,
//     soldOut: false,
//     id: 1,
//   },
//   {
//     name: "Agoyin",
//     ingredients: "super boied beans, unique agoyin flavours, pepper",
//     price: 1500,
//     available: 12,
//     sold: 0,
//     photoName: img2,
//     soldOut: false,
//     id: 2,
//   },
//   {
//     name: "Farm-house Beans",
//     ingredients: "Tomato, fine grains of beans with a blend of perfection",
//     price: 1000,
//     available: 12,
//     sold: 0,
//     photoName: img3,
//     soldOut: false,
//     id: 3,
//   },
//   {
//     name: "Kidney Beans hugo",
//     ingredients: "Large chuks of the finest beans and blablabla",
//     price: 1600,
//     available: 12,
//     sold: 0,
//     photoName: img4,
//     soldOut: false,
//     id: 4,
//   },
//   {
//     name: "Odudu Vegetable",
//     ingredients: "drink and eat the healthy beans made with love",
//     price: 600,
//     available: 12,
//     sold: 0,
//     photoName: img5,
//     soldOut: true,
//     id: 5,
//   },
//   {
//     name: "Beans pepper-soup",
//     ingredients: "small grains of beans with a unique taste from bullseye",
//     price: 500,
//     available: 12,
//     sold: 0,
//     photoName: img6,
//     soldOut: false,
//     id: 6,
//   },
//   {
//     name: "Black Beans sensation",
//     ingredients: "Large chuks of the finest beans and blablabla",
//     price: 1600,
//     available: 12,
//     sold: 0,
//     photoName: img7,
//     soldOut: false,
//     id: 7,
//   },
//   {
//     name: "Agoyin vegetabel",
//     ingredients: "drink and eat the healthy beans made with love",
//     price: 600,
//     available: 12,
//     sold: 0,
//     photoName: img8,
//     soldOut: true,
//     id: 8,
//   },
//   {
//     name: "plain beans and stew",
//     ingredients: "small grains of beans with a unique taste from bullseye",
//     price: 500,
//     available: 12,
//     sold: 0,
//     photoName: img9,
//     soldOut: false,
//     id: 9,
//   },
//   {
//     name: "Black sead beans",
//     ingredients: "vegetables, onions mega belsnd ingridents",
//     price: 1200,
//     available: 12,
//     sold: 0,
//     photoName: img10,
//     soldOut: false,
//     id: 10,
//   },
//   {
//     name: "Fiofio",
//     ingredients: "super boied beans, unique agoyin flavours, pepper",
//     price: 1500,
//     available: 12,
//     sold: 0,
//     photoName: img11,
//     soldOut: false,
//     id: 11,
//   },
//   {
//     name: "white beans",
//     ingredients: "drink and eat the healthy beans made with love",
//     price: 600,
//     available: 12,
//     sold: 0,
//     photoName: img12,
//     soldOut: true,
//     id: 12,
//   },
//   {
//     name: "vegitable beans special",
//     ingredients: "vegitables, onions mega belsnd ingridents",
//     price: 1200,
//     available: 12,
//     sold: 0,
//     photoName: img13,
//     soldOut: false,
//     id: 13,
//   },
//   {
//     name: "Agoyin",
//     ingredients: "super boied beans, unique agoyin flavours, pepper",
//     price: 1500,
//     available: 12,
//     sold: 0,
//     photoName: img14,
//     soldOut: false,
//     id: 14,
//   },
//   {
//     name: "Farm-house Beans",
//     ingredients: "Tomato, fine grains of beans with a blend of perfection",
//     price: 1000,
//     available: 12,
//     sold: 0,
//     photoName: img15,
//     soldOut: false,
//     id: 15,
//   },
//   {
//     name: "Kidney Beans hugo",
//     ingredients: "Large chuks of the finest beans and blablabla",
//     price: 1600,
//     available: 12,
//     sold: 0,
//     photoName: img16,
//     soldOut: false,
//     id: 16,
//   },
//   {
//     name: "Odudu Vegetable",
//     ingredients: "drink and eat the healthy beans made with love",
//     price: 600,
//     available: 12,
//     sold: 0,
//     photoName: img17,
//     soldOut: true,
//     id: 17,
//   },
//   {
//     name: "Beans pepper-soup",
//     ingredients: "small grains of beans with a unique taste from bullseye",
//     price: 500,
//     available: 12,
//     sold: 0,
//     photoName: img18,
//     soldOut: false,
//     id: 18,
//   },
//   {
//     name: "Black Beans sensation",
//     ingredients: "Large chuks of the finest beans and blablabla",
//     price: 1600,
//     available: 12,
//     sold: 0,
//     photoName: img19,
//     soldOut: false,
//     id: 19,
//   },
//   {
//     name: "Agoyin vegetabel",
//     ingredients: "drink and eat the healthy beans made with love",
//     price: 600,
//     available: 12,
//     sold: 0,
//     photoName: img20,
//     soldOut: true,
//     id: 20,
//   },
//   {
//     name: "plain beans and stew",
//     ingredients: "small grains of beans with a unique taste from bullseye",
//     price: 500,
//     available: 12,
//     sold: 0,
//     photoName: img21,
//     soldOut: false,
//     id: 21,
//   },
//   {
//     name: "Black sead beans",
//     ingredients: "vegetables, onions mega belsnd ingridents",
//     price: 1200,
//     available: 12,
//     sold: 0,
//     photoName: img22,
//     soldOut: false,
//     id: 22,
//   },
//   {
//     name: "Fiofio",
//     ingredients: "super boied beans, unique agoyin flavours, pepper",
//     price: 1500,
//     available: 12,
//     sold: 0,
//     photoName: img23,
//     soldOut: false,
//     id: 23,
//   },
//   {
//     name: "white beans",
//     ingredients: "drink and eat the healthy beans made with love",
//     price: 600,
//     available: 12,
//     sold: 0,
//     photoName: img24,
//     soldOut: true,
//     id: 24,
//   },
//   {
//     name: "Black Beans sensation",
//     ingredients: "Large chuks of the finest beans and blablabla",
//     price: 1600,
//     available: 12,
//     sold: 0,
//     photoName: img25,
//     soldOut: false,
//     id: 25,
//   },
//   {
//     name: "Agoyin vegetabel",
//     ingredients: "drink and eat the healthy beans made with love",
//     price: 600,
//     available: 12,
//     sold: 0,
//     photoName: img26,
//     soldOut: true,
//     id: 26,
//   },
//   {
//     name: "plain beans and stew",
//     ingredients: "small grains of beans with a unique taste from bullseye",
//     price: 500,
//     available: 12,
//     sold: 0,
//     photoName: img27,
//     soldOut: false,
//     id: 27,
//   },
//   {
//     name: "Black sead beans",
//     ingredients: "vegetables, onions mega belsnd ingridents",
//     price: 1200,
//     available: 12,
//     sold: 0,
//     photoName: img28,
//     soldOut: false,
//     id: 28,
//   },
//   {
//     name: "Fiofio",
//     ingredients: "super boied beans, unique agoyin flavours, pepper",
//     price: 1500,
//     available: 12,
//     sold: 0,
//     photoName: img29,
//     soldOut: false,
//     id: 29,
//   },
//   {
//     name: "white beans",
//     ingredients: "drink and eat the healthy beans made with love",
//     price: 600,
//     available: 12,
//     sold: 0,
//     photoName: img30,
//     soldOut: true,
//     id: 30,
//   },
// ];

// function Homepage() {
//   return (
//     <div className="App">
//       <Hero />
//       <SectionMenuAndMenuContainer />
//     </div>
//   );
// }

// function MenuContainer() {
//   return (
//     <div className="menu-container">
//       {beansData.map((Beans) => (
//         <BensCard beansObj={Beans} key={Beans.id} />
//       ))}
//     </div>
//   );
// }

// function BensCard({ beansObj }) {
//   const [quantityOrdered, setQuantityOrdered] = useState(0);
//   function handleCountUp() {
//     setQuantityOrdered(() => quantityOrdered + 1);
//   }
//   function handleCountDown() {
//     if (quantityOrdered >= 1) setQuantityOrdered(() => quantityOrdered - 1);
//   }
//   console.log(beansObj);

//   return (
//     <div className="overall">
//       <div className="content-box">
//         <img
//           className="img"
//           src={beansObj.photoName}
//           alt="beans img"
//           onClick={handleCountUp}
//         />
//         <div className="description">
//           <strong className="dish-name">{beansObj.name}</strong>
//           <p className="dish-description"> {beansObj.ingredients}</p>
//           <div>
//             <span>Available </span>
//             <span> &bull;</span>
//             <span> sold</span>
//           </div>
//         </div>
//       </div>
//       <div className="click-order">
//         <span className="price">
//           {" "}
//           <sup className="naira">&#8358;</sup>
//           {beansObj.price}
//         </span>
//         <button className="btn btn-effect" onClick={handleCountDown}>
//           -
//         </button>
//         <span className="quantity-ordered">{quantityOrdered}</span>
//         <button className="btn btn-effect" onClick={handleCountUp}>
//           +
//         </button>
//       </div>
//     </div>
//   );
// }
// function SectionMenuAndMenuContainer() {
//   return (
//     <section className="section-menu">
//       <div className="menu-header-box">
//         <h2 className="heading-secondary">Our menu 🔥</h2>
//         <p className="menu-paragraph">30 items showing &darr;</p>
//       </div>
//       <div className="menu-cart-flexbox">
//         <div className="menu-box">
//           {/* <div className="menu-header-box">
//             <h2 className="heading-secondary">Our menu 🔥</h2>
//             <p className="menu-paragraph">30 items showing &darr;</p>
//           </div> */}
//           <MenuContainer />
//         </div>
//         <div className="side-cart-box">
//           <div className="side-cart">
//             <h3 className="side-cart-heading">Order Details</h3>
//             <div className="side-cart-item">item</div>
//             <div className="side-cart-item">item</div>
//             <div className="side-cart-item">item</div>
//             <div className="order-summary-box">
//               <h3 className="side-cart-heading">Order Summary</h3>
//               <div className="total-box">
//                 <span className="total">Total:</span>
//                 <span className="total-amount">700</span>
//               </div>
//               <button className="side-cart-btn btn-effect">
//                 Process Transaction
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
// export default Homepage;
