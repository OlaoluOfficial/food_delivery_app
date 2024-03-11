import React from "react";
import "../styles/Agada.css";
import img4 from "../img/beans-img4.jpg";
import img2 from "../img/beans-img3.jpg";
import img3 from "../img/beans-img6.jpg";

function SpecialOffer() {
  return (
    <section>
      {" "}
      <div className="Containerwe"></div>
      <div className="container404">
        <h1 style={{ fontSize: "10rem" }}>Coming Soon</h1>

        <p>Stay tuned to our Website, cos this page will soon be available</p>

        <a className="button404" href="http://localhost:3000">
          GO TO HOMEPAGE
        </a>
      </div>
    </section>
  );
}

export default SpecialOffer;
