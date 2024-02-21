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
      <div className="special-offer">
        <h2 className="special-offer-text">Special Offers </h2>
      </div>
      <div className="Special-Cards">
        <div className="Card-1">
          <div>
            <img className="img-special" src={img4} alt="Beans-delicacy" />
          </div>
          <h3 className="offer-plan">Two Weeks Special</h3>
          <ul className="offer-list">
            <li className="offer-list-item">5% discount on all dishes 🍛</li>
            <li className="offer-list-item">Cancel anytime 🗑️</li>
            <li className="offer-list-item">Delivery on schedule ⏰</li>
            <li className="offer-list-item">❌</li>
          </ul>
          <div>
            <button className="Btn-Pack">Learn more</button>
          </div>
        </div>

        <div className="Card-2">
          <div>
            <img className="img-special" src={img2} alt="Beans-delicacy" />
          </div>
          <h3 className="offer-plan">Monthly Special</h3>
          <ul className="offer-list">
            <li className="offer-list-item">8% discount on all dishes 🍛</li>
            <li className="offer-list-item">Cancel anytime 🗑️</li>
            <li className="offer-list-item">Delivery on schedule ⏰</li>
            <li className="offer-list-item">1 free meal Monthly 😍</li>
          </ul>
          <div>
            <button className="Btn-Pack">Learn more</button>
          </div>
        </div>

        <div className="Card-3">
          <div>
            <img className="img-special" src={img3} alt="Beans-delicacy" />
          </div>
          <h3 className="offer-plan">Party Package</h3>
          <ul className="offer-list">
            <li className="offer-list-item">Best Rates</li>
            <li className="offer-list-item">Quality service</li>
            <li className="offer-list-item">Delivery on schedule ⏰</li>
            <li className="offer-list-item">❌</li>
          </ul>
          <div>
            <button className="Btn-Pack">Learn more</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SpecialOffer;
