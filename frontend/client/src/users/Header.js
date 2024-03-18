import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import {useUser} from "./userContext";
import { useCart } from "./CartContext";

function Header() {
  const { setUserInfo, userInfo } = useUser()
  const { cartItemCount, clearCart } = useCart();
  
  function logout() {
    fetch("http://localhost:2300/api/v1/auth/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
    clearCart()
  }
  const username =
    userInfo && userInfo.username ? userInfo.username.split(" ") : null;
  const name = username ? username[0] : null;

  return (
    <div className="Header">
      <div className="nav-flex-container">
        <nav>
          <ul id="navbar">
            <li>
              <Link className="nav-list-item" to="/">
                Me<span style={{ color: "#ffd43b" }}>n</span>u
              </Link>
            </li>

            <li>
              <Link className="nav-list-item" to="/specialoffers">
                <span style={{ color: "#ffd43b" }}>S</span>pecial
                <span style={{ color: "#ffd43b" }}>O</span>ffers
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
              <span className="nav-btn nav-btn-colored">{name}</span>
            </>
          )}
          {!name && (
            <>
              <Link className="nav-btn" to="/login">
                Log In
              </Link>
            </>
          )}
          <Link to="/cart">
            <div className="cart-icon-container">
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
              {cartItemCount > 0 && <span>{cartItemCount}</span>}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
