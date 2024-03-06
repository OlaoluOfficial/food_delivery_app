import { Link } from "react-router-dom";
import "./primaryPage.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import AdminLoginPage from "./adminLogin";
import { FaTruckFast, FaUtensils, FaBuilding } from "react-icons/fa6";
import logo from "../users/img/EatRite-logo.png";

function PrimaryPage() {
  const token = Cookies.get("jwt");
  console.log(token);
  const [isLoggedIn, setIsLoggedIn] = useState(token !== undefined);
  return (
    <>
      {/* {isLoggedIn ? ( */}
      <div className="container13">
        <div className="container1">
          <Link
            style={{ textDecoration: "none", color: "#fff" }}
            to="/admin/restaurant"
          >
            <div className="primaryCard">
              <FaBuilding className="adminIcon" />
              <h3> Manage Restaurants</h3>
            </div>
          </Link>

          <Link
            style={{ textDecoration: "none", color: "#fff" }}
            to="/admin/delivery"
          >
            <div className="primaryCard">
              <FaTruckFast className="adminIcon" />
              <h3> Manage Delivery Personnels</h3>
            </div>
          </Link>
        </div>
        <img className="hero-img-admin margin-top-big" src={logo} alt="logo" />
      </div>
      {/* //   ) : ( */}
      {/* //     <AdminLoginPage /> */}
      {/* //   )} */}
    </>
  );
}

export default PrimaryPage;
