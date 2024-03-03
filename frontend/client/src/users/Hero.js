import img from "./img/EatRite-logo.png";
import React from "react";

export default function Hero() {
  return (
    <div className="hero-container">
      <div className="section-hero">
        <img className="hero-img" src={img} alt="hero-img" />
        <h1 className="heading-primary">
          {" "}
          <span className="orange-text">E</span>at
          <span className="orange-text">R</span>ite
        </h1>
      </div>
    </div>
  );
}
// https://www.design.com/maker/social/2nxafmnrfq
