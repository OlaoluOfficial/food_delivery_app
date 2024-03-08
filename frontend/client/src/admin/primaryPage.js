import { Link, useNavigate } from "react-router-dom";
import "./primaryPage.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import AdminLoginPage from "./adminLogin";
import { FaTruckFast, FaUtensils, FaBuilding } from "react-icons/fa6";
import logo from "../users/img/EatRite-logo.png";
import AdminHeader from "./adminHeader";

function PrimaryPage() {
  const token = Cookies.get("foodieToken");
  const [isLoggedIn, setIsLoggedIn] = useState(token !== undefined);

  return (
    <>
      {isLoggedIn ? (
        <div className="container13">
          <AdminHeader />
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
          <img className="hero-img margin-top-big" src={logo} alt="logo" />
        </div>
      ) : (
        <AdminLoginPage /> )}
     
    </>
  );
}

export default PrimaryPage;
