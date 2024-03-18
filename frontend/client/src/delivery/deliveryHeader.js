import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../admin/adminHeader.css";
import { useAdmin } from "../admin/adminContext";
import Cookies from "js-cookie";

function DeliveryHeader() {
  const token = Cookies.get("foodieToken");
  const { adminInfo, setAdminInfo } = useAdmin();
  const navigate = useNavigate();

  function logout() {
    fetch("http://localhost:2300/api/v1/auth/logout", {
      credentials: "include",
      method: "POST",
    }).then(() => {
      navigate("/delivery/login");
    });
    setAdminInfo(null);
  }
  if (adminInfo) {
    if (adminInfo.role == "restaurant") {
      const username =
        adminInfo && adminInfo.name ? adminInfo.name.split(" ") : null;
      var Dname = username ? username[0] : null;
    } else {
      const username =
        adminInfo && adminInfo.username ? adminInfo.username.split(" ") : null;
      var Dname = username ? username[0] : null;
    }
  }
  return (
    <div className="Header1">
      <div className="nav-flex-container1">
        <div className="nav-btn-box">
          {Dname && (
            <>
              <a className="nav-btn1" onClick={logout}>
                Logout
              </a>
              <span className="nav-btn1 nav-btn-colored1">{Dname}</span>
            </>
          )}
          {!Dname && (
            <>
              <Link className="nav-btn1" to="/admin/login">
                Log-In
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default DeliveryHeader;
