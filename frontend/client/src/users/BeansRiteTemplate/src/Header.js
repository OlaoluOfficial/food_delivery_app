import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import UserContext from "./userContext";

function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:5000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch("http://localhost:5000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }
  const username = userInfo?.username;
  return (
    <div className="Header">
      <div className="nav-flex-container">
        <nav>
          <ul id="navbar">
            <li>
              <Link className="nav-list-item" to="/">
                Menu
              </Link>
            </li>
            {/* <li>
              <Link className="nav-list-item" to="/services">
                Services
              </Link>
            </li> */}
            <li>
              <Link className="nav-list-item" to="/api/getcombos">
                Combo Deals
              </Link>
            </li>
            <li>
              <Link className="nav-list-item" to="/specialoffers">
                Special Offers
              </Link>
            </li>
          </ul>
        </nav>
        <div className="nav-btn-box">
          {username && (
            <>
              <a className="nav-btn" onClick={logout}>
                Logout
              </a>
              <span className="nav-btn nav-btn-colored">{username}</span>
            </>
          )}
          {!username && (
            <>
              <Link className="nav-btn" to="/login">
                Log-In
              </Link>
            </>
          )}
        </div>
      </div>
      <Link to="/cart">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="nav-cart"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
      </Link>
    </div>
  );
}

export default Header;
