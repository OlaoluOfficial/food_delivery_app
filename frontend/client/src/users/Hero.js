import img from "./beansLogo.png";
import React from "react";


export default function Hero() {
  return (
    <div className="hero-container">
      <div className="section-hero">
        <img className="hero-img" src={img} alt="hero-img" />
        <h1 className="heading-primary">
          {" "}
          <span className="orange-text">B</span>eans
          <span className="orange-text">R</span>ite
        </h1>
      </div>
    </div>
  );
}