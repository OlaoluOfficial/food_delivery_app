import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./adminHeader.css";
import AdminContext from "./adminContext";

function AdminHeader() {
  const { setAdminInfo, adminInfo } = useContext(AdminContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:2300/api/v1/users/getProfile", {
      credentials: "include",
    }).then((response) => {
      if (response.ok) {
        response.json().then((userInfo) => {
          setAdminInfo(userInfo);
        });
      } else {
        setAdminInfo(null);
      }
    });
  }, [setAdminInfo]);


  function logout() {
    fetch("http://localhost:2300/api/v1/auth/logout", {
      credentials: "include",
      method: "POST",
    }).then(() => {
      navigate("/admin/login");
    });
    setAdminInfo(null);
  }
  const username =
    adminInfo && adminInfo.username ? adminInfo.username.split(" ") : null;
  const name = username ? username[0] : null;

  return (
    <div className="Header1">
      <div className="nav-flex-container1">
        <div className="nav-btn-box">
          {username && (
            <>
              <a className="nav-btn1" onClick={logout}>
                Logout
              </a>
              <span className="nav-btn1 nav-btn-colored1">{name}</span>
            </>
          )}
          {!name && (
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

export default AdminHeader;
