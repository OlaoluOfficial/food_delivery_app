import React from "react";
import "../styles/prince.css";
import img1 from "../img/beans-img.jpg";
import img2 from "../img/beans-img1.jpg";
import img3 from "../img/beans-img8.jpg";

function Cart() {
  return (
    <div className="containerww">
      <h4>Bill Details</h4>
      {/* <h3>Customer Name</h3> */}
      <form>
        <input
          type="text"
          placeholder="Customer Name"
          //   onChange={getInput}
        />
      </form>
      <hr id="hr1" />
      <div className="cont1">
        <p className="order1">Order Details </p>
        <div>
          <p className="cont2">
            <img className='imgww' src={img1} />
            <h6 className="delicacy1">
              Aganyin Beans & Sauce
              <p className="object1">
                <button className="minusw">-</button>{" "}
                <span className="twwo">2</span>
                <button className="pwlus">+</button>{" "}
                <span className="valwue">$36.00</span>{" "}
              </p>
            </h6>
          </p>
          <hr className="hr2" />
        </div>
        <div>
          <p className="cont2">
            <img className='imgww' src={img2} />
            <h6 className="delicacy1">
              Plantain
              <p className="object1">
                <button className="minusw">-</button>{" "}
                <span className="twwo">2</span>
                <button className="pwlus">+</button>{" "}
                <span className="valwue">$36.00</span>{" "}
              </p>
            </h6>
          </p>
          <hr className="hr3" />
        </div>
        <div>
          <p className="cont2">
            <img className='imgww' src={img3} />
            <h6 className="delicacy1">
              Bread
              <p className="object1">
                <button className="minusw">-</button>{" "}
                <span className="twwo">2</span>
                <button className="pwlus">+</button>{" "}
                <span className="valwue">$36.00</span>{" "}
              </p>
            </h6>
          </p>
          <hr className="hr4" />
        </div>
      </div>
      <div>
        {/* <h6>Item:</h6>
        <h6>Subtotal:</h6>
        <h6>Discount:</h6>
        <h6>Tax(10%):</h6> */}
      </div>
      <div className="order1">
        <h3>Order Summary</h3>
      </div>
      <div className="container2">
        <div className="border1">
          <div className="total1">
            <h5 className="amount11">Subtotal</h5>
            <h5 className="amount2">$ 79.80</h5>
          </div>
          <div className="total">
            <h5 className="amount1">Tax(10%)</h5>
            <h5 className="amount2">$ 10.80</h5>
          </div>
        </div>
        {/* <div className="border">
          <h5>Pay with Card</h5>
        </div> */}
        <button class="btn22">Submit Order</button>
      </div>
    </div>
  );
}

export default Cart;
